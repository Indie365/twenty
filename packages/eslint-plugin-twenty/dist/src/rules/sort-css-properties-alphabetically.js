"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const utils_2 = require("@typescript-eslint/utils");
const postcss_1 = __importDefault(require("postcss"));
const createRule = utils_2.ESLintUtils.RuleCreator(() => `https://docs.twenty.com`);
const isStyledTagname = (node) => {
    const isMemberExpression = (node) => node.type === utils_1.TSESTree.AST_NODE_TYPES.MemberExpression;
    const isCallExpression = (node) => node.type === utils_1.TSESTree.AST_NODE_TYPES.CallExpression;
    const isIdentifier = (node) => (node === null || node === void 0 ? void 0 : node.type) === utils_1.TSESTree.AST_NODE_TYPES.Identifier;
    if (isIdentifier(node.tag)) {
        return node.tag.name === "css";
    }
    if (isMemberExpression(node.tag) && isIdentifier(node.tag.object)) {
        return node.tag.object.name === "styled";
    }
    if (isCallExpression(node.tag) && isIdentifier(node.tag.callee)) {
        return node.tag.callee.name === "styled";
    }
    if (isCallExpression(node.tag) &&
        isMemberExpression(node.tag.callee) &&
        isIdentifier(node.tag.callee.object)) {
        return node.tag.callee.object.name === "styled";
    }
    if (isCallExpression(node.tag) &&
        isMemberExpression(node.tag.callee) &&
        isIdentifier(node.tag.callee.object)) {
        return node.tag.callee.object.name === "styled";
    }
    if (isCallExpression(node.tag) &&
        isMemberExpression(node.tag.callee) &&
        isMemberExpression(node.tag.callee.object) &&
        isIdentifier(node.tag.callee.object.object)) {
        return node.tag.callee.object.object.name === "styled";
    }
    return false;
};
/**
 * An atomic rule is a rule without nested rules.
 */
const isValidAtomicRule = (rule) => {
    const decls = rule.nodes.filter((node) => node.type === "decl");
    if (decls.length < 0) {
        return { isValid: true };
    }
    for (let i = 1; i < decls.length; i++) {
        const current = decls[i].prop;
        const prev = decls[i - 1].prop;
        if (current < prev) {
            const loc = {
                start: {
                    line: decls[i - 1].source.start.line,
                    column: decls[i - 1].source.start.column - 1,
                },
                end: {
                    line: decls[i].source.end.line,
                    column: decls[i].source.end.column - 1,
                },
            };
            return { isValid: false, loc };
        }
    }
    return { isValid: true };
};
const isValidRule = (rule) => {
    // check each rule recursively
    const { isValid, loc } = rule.nodes.reduce((map, node) => {
        return node.type === "rule" ? isValidRule(node) : map;
    }, { isValid: true });
    // if there is any invalid rule, return result
    if (!isValid) {
        return { isValid, loc };
    }
    // check declarations
    return isValidAtomicRule(rule);
};
const getNodeStyles = (node) => {
    const [firstQuasi, ...quasis] = node.quasi.quasis;
    // remove line break added to the first quasi
    const lineBreakCount = node.quasi.loc.start.line - 1;
    let styles = `${"\n".repeat(lineBreakCount)}${" ".repeat(node.quasi.loc.start.column + 1)}${firstQuasi.value.raw}`;
    // replace expression by spaces and line breaks
    quasis.forEach(({ value, loc }, idx) => {
        const prevLoc = idx === 0 ? firstQuasi.loc : quasis[idx - 1].loc;
        const lineBreaksCount = loc.start.line - prevLoc.end.line;
        const spacesCount = loc.start.line === prevLoc.end.line
            ? loc.start.column - prevLoc.end.column + 2
            : loc.start.column + 1;
        styles = `${styles}${" "}${"\n".repeat(lineBreaksCount)}${" ".repeat(spacesCount)}${value.raw}`;
    });
    return styles;
};
const fix = ({ rule, fixer, src, }) => {
    let fixings = [];
    // concat fixings recursively
    rule.nodes.forEach((node) => {
        if (node.type === "rule") {
            fixings = [...fixings, ...fix({ rule: node, fixer, src })];
        }
    });
    const declarations = rule.nodes.filter((node) => node.type === "decl");
    const sortedDeclarations = sortDeclarations(declarations);
    declarations.forEach((decl, idx) => {
        if (!areSameDeclarations(decl, sortedDeclarations[idx])) {
            try {
                const range = getDeclRange({ decl, src });
                const sortedDeclText = getDeclText({
                    decl: sortedDeclarations[idx],
                    src,
                });
                fixings.push(fixer.removeRange([range.startIdx, range.endIdx + 1]));
                fixings.push(fixer.insertTextAfterRange([range.startIdx, range.startIdx], sortedDeclText));
            }
            catch (e) {
                console.log(e);
            }
        }
    });
    return fixings;
};
const areSameDeclarations = (a, b) => a.source.start.line === b.source.start.line &&
    a.source.start.column === b.source.start.column;
const getDeclRange = ({ decl, src, }) => {
    const loc = {
        start: {
            line: decl.source.start.line,
            column: decl.source.start.column - 1,
        },
        end: {
            line: decl.source.end.line,
            column: decl.source.end.column - 1,
        },
    };
    const startIdx = src.getIndexFromLoc(loc.start);
    const endIdx = src.getIndexFromLoc(loc.end);
    return { startIdx, endIdx };
};
const getDeclText = ({ decl, src, }) => {
    const { startIdx, endIdx } = getDeclRange({ decl, src });
    return src.getText().substring(startIdx, endIdx + 1);
};
const sortDeclarations = (declarations) => declarations
    .slice()
    .sort((declA, declB) => (declA.prop > declB.prop ? 1 : -1));
const sortCssPropertiesAlphabeticallyRule = createRule({
    create: (context) => {
        return {
            TaggedTemplateExpression: (node) => {
                if (isStyledTagname(node)) {
                    try {
                        const root = postcss_1.default.parse(getNodeStyles(node));
                        const { isValid } = isValidRule(root);
                        if (!isValid) {
                            return context.report({
                                node,
                                messageId: "sortCssPropertiesAlphabetically",
                                fix: (fixer) => fix({
                                    rule: root,
                                    fixer,
                                    src: context.getSourceCode(),
                                }),
                            });
                        }
                    }
                    catch (e) {
                        return true;
                    }
                }
            },
        };
    },
    name: "sort-css-properties-alphabetically",
    meta: {
        docs: {
            description: "Styles are sorted alphabetically.",
            recommended: "recommended",
        },
        messages: {
            sortCssPropertiesAlphabetically: "Declarations should be sorted alphabetically.",
        },
        type: "suggestion",
        schema: [],
        fixable: "code",
    },
    defaultOptions: [],
});
module.exports = sortCssPropertiesAlphabeticallyRule;
exports.default = sortCssPropertiesAlphabeticallyRule;
