"use strict";function r(r,e){if(e==null||e>r.length)e=r.length;for(var n=0,t=new Array(e);n<e;n++)t[n]=r[n];return t}function e(r){if(Array.isArray(r))return r}function n(r,e,n){if(e in r){Object.defineProperty(r,e,{value:n,enumerable:true,configurable:true,writable:true})}else{r[e]=n}return r}function t(r,e){var n=r==null?null:typeof Symbol!=="undefined"&&r[Symbol.iterator]||r["@@iterator"];if(n==null)return;var t=[];var a=true;var o=false;var c,i;try{for(n=n.call(r);!(a=(c=n.next()).done);a=true){t.push(c.value);if(e&&t.length===e)break}}catch(r){o=true;i=r}finally{try{if(!a&&n["return"]!=null)n["return"]()}finally{if(o)throw i}}return t}function a(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};var a=Object.keys(t);if(typeof Object.getOwnPropertySymbols==="function"){a=a.concat(Object.getOwnPropertySymbols(t).filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))}a.forEach(function(e){n(r,e,t[e])})}return r}function c(r,e){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);if(e){t=t.filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})}n.push.apply(n,t)}return n}function i(r,e){e=e!=null?e:{};if(Object.getOwnPropertyDescriptors){Object.defineProperties(r,Object.getOwnPropertyDescriptors(e))}else{c(Object(e)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(e,n))})}return r}function u(r,n){return e(r)||t(r,n)||d(r,n)||a()}function l(r,e){if(!e){e=r.slice(0)}return Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(e)}}))}function d(e,n){if(!e)return;if(typeof e==="string")return r(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor)t=e.constructor.name;if(t==="Map"||t==="Set")return Array.from(t);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return r(e,n)}function s(){var r=l(["\n  align-items: center;\n  background-color: ",";\n  border-radius: 50%;\n  display: flex;\n  height: 20px;\n  justify-content: center;\n  width: 20px;\n"]);s=function e(){return r};return r}function g(){var r=l(["\n  backdrop-filter: ",";\n  background-color: ",";\n  border-radius: ",";\n\n  box-shadow: ",";\n  color: ",";\n\n  font-size: ",";\n  font-weight: ",";\n\n  max-width: 40%;\n  overflow: visible;\n\n  padding: ",";\n\n  word-break: break-word;\n\n  z-index: ",";\n"]);g=function e(){return r};return r}function f(){var r=l(["\n  cursor: ",";\n  font-family: inherit;\n  font-size: inherit;\n\n  font-weight: inherit;\n  max-width: 100%;\n  overflow: hidden;\n  text-decoration: inherit;\n\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);f=function e(){return r};return r}function p(){var r=l(["\n  align-items: center;\n\n  background-color: ",";\n  border-color: ",";\n  border-radius: ",";\n  border-style: ",";\n  border-width: ",";\n\n  color: ",";\n  cursor: ",";\n  display: inline-flex;\n  font-weight: ",";\n  gap: ",";\n\n  height: ",";\n  max-width: ",";\n\n  overflow: hidden;\n  padding: ",";\n  user-select: none;\n\n  :hover {\n    ","\n  }\n  :active {\n    ","\n  }\n"]);p=function e(){return r};return r}function y(){var r=l(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);y=function e(){return r};return r}function b(){var r=l(["\n  align-items: center;\n  background: ",";\n  border-radius: 50px;\n  color: ",";\n  display: flex;\n  font-size: ",";\n  font-style: normal;\n  font-weight: ",";\n  gap: ",";\n  height: ",";\n  justify-content: flex-end;\n  line-height: ",";\n  margin-left: auto;\n  padding: ",";\n"]);b=function e(){return r};return r}function h(){var r=l(["\n  align-items: center;\n  ","\n\n  border-radius: ",";\n  border-style: solid;\n  border-width: ",";\n  cursor: ",";\n  display: flex;\n  flex-direction: row;\n  font-family: ",";\n  font-weight: 500;\n  gap: ",";\n  height: ",";\n  padding: ",";\n\n  transition: background 0.1s ease;\n\n  white-space: nowrap;\n\n  width: ",";\n\n  &:focus {\n    outline: none;\n  }\n"]);h=function e(){return r};return r}var v=require("@emotion/react");var m=require("hex-rgb");var x=require("@emotion/styled");var k=require("@tabler/icons-react");var w=require("react/jsx-runtime");var j=require("framer-motion");var S=require("react");var A=require("react-dom");var q=require("uuid");var O=require("react-tooltip");function z(r){return r&&r.__esModule?r:{default:r}}var P=z(m);var C=z(x);var D={gray100:"#000000",gray90:"#141414",gray85:"#171717",gray80:"#1b1b1b",gray75:"#1d1d1d",gray70:"#222222",gray65:"#292929",gray60:"#333333",gray55:"#4c4c4c",gray50:"#666666",gray45:"#818181",gray40:"#999999",gray35:"#b3b3b3",gray30:"#cccccc",gray25:"#d6d6d6",gray20:"#ebebeb",gray15:"#f1f1f1",gray10:"#fcfcfc",gray0:"#ffffff"},T={yellow:"#ffd338",green:"#55ef3c",turquoise:"#15de8f",sky:"#00e0ff",blue:"#1961ed",purple:"#915ffd",pink:"#f54bd0",red:"#f83e3e",orange:"#ff7222",gray:D.gray30},I={yellow80:"#2e2a1a",yellow70:"#453d1e",yellow60:"#746224",yellow50:"#b99b2e",yellow40:"#ffe074",yellow30:"#ffedaf",yellow20:"#fff6d7",yellow10:"#fffbeb",green80:"#1d2d1b",green70:"#23421e",green60:"#2a5822",green50:"#42ae31",green40:"#88f477",green30:"#ccfac5",green20:"#ddfcd8",green10:"#eefdec",turquoise80:"#172b23",turquoise70:"#173f2f",turquoise60:"#166747",turquoise50:"#16a26b",turquoise40:"#5be8b1",turquoise30:"#a1f2d2",turquoise20:"#d0f8e9",turquoise10:"#e8fcf4",sky80:"#152b2e",sky70:"#123f45",sky60:"#0e6874",sky50:"#07a4b9",sky40:"#4de9ff",sky30:"#99f3ff",sky20:"#ccf9ff",sky10:"#e5fcff",blue80:"#171e2c",blue70:"#172642",blue60:"#18356d",blue50:"#184bad",blue40:"#5e90f2",blue30:"#a3c0f8",blue20:"#d1dffb",blue10:"#e8effd",purple80:"#231e2e",purple70:"#2f2545",purple60:"#483473",purple50:"#6c49b8",purple40:"#b28ffe",purple30:"#d3bffe",purple20:"#e9dfff",purple10:"#f4efff",pink80:"#2d1c29",pink70:"#43213c",pink60:"#702c61",pink50:"#b23b98",pink40:"#f881de",pink30:"#fbb7ec",pink20:"#fddbf6",pink10:"#feedfa",red80:"#2d1b1b",red70:"#441f1f",red60:"#712727",red50:"#b43232",red40:"#fa7878",red30:"#fcb2b2",red20:"#fed8d8",red10:"#feecec",orange80:"#2e2018",orange70:"#452919",orange60:"#743b1b",orange50:"#b9571f",orange40:"#ff9c64",orange30:"#ffc7a7",orange20:"#ffe3d3",orange10:"#fff1e9",gray80:D.gray70,gray70:D.gray65,gray60:D.gray55,gray50:D.gray40,gray40:D.gray25,gray30:D.gray20,gray20:D.gray15,gray10:D.gray10,blueAccent90:"#141a25",blueAccent85:"#151d2e",blueAccent80:"#152037",blueAccent75:"#16233f",blueAccent70:"#17294a",blueAccent60:"#18356d",blueAccent40:"#a3c0f8",blueAccent35:"#c8d9fb",blueAccent25:"#dae6fc",blueAccent20:"#e2ecfd",blueAccent15:"#edf2fe",blueAccent10:"#f5f9fd"},L=o({},T,I),H=function(r,e){return"rgba(".concat(P.default(r,{format:"array"}).slice(0,-1).join(","),",").concat(e,")")};var W={primary:L.blueAccent25,secondary:L.blueAccent20,tertiary:L.blueAccent15,quaternary:L.blueAccent10,accent3570:L.blueAccent35,accent4060:L.blueAccent40},B={primary:L.blueAccent75,secondary:L.blueAccent80,tertiary:L.blueAccent85,quaternary:L.blueAccent90,accent3570:L.blueAccent70,accent4060:L.blueAccent60};var E={duration:{instant:.075,fast:.15,normal:.3}};var M="./dark-noise-JHVNKF2E.jpg";var N="./light-noise-JRI6I6YG.png";var G={noisy:"url(".concat(N.toString(),");"),primary:D.gray0,secondary:D.gray10,tertiary:D.gray15,quaternary:D.gray20,danger:L.red10,transparent:{primary:H(D.gray0,.8),secondary:H(D.gray10,.8),strong:H(D.gray100,.16),medium:H(D.gray100,.08),light:H(D.gray100,.04),lighter:H(D.gray100,.02),danger:H(L.red,.08)},overlay:H(D.gray80,.8),radialGradient:"radial-gradient(50% 62.62% at 50% 0%, #505050 0%, ".concat(D.gray60," 100%)"),radialGradientHover:"radial-gradient(76.32% 95.59% at 50% 0%, #505050 0%, ".concat(D.gray60," 100%)")},F={noisy:"url(".concat(M.toString(),");"),primary:D.gray85,secondary:D.gray80,tertiary:D.gray75,quaternary:D.gray70,danger:L.red80,transparent:{primary:H(D.gray85,.8),secondary:H(D.gray80,.8),strong:H(D.gray0,.14),medium:H(D.gray0,.1),light:H(D.gray0,.06),lighter:H(D.gray0,.03),danger:H(L.red,.08)},overlay:H(D.gray80,.8),radialGradient:"radial-gradient(50% 62.62% at 50% 0%, #505050 0%, ".concat(D.gray60," 100%)"),radialGradientHover:"radial-gradient(76.32% 95.59% at 50% 0%, #505050 0%, ".concat(D.gray60," 100%)")};var R={light:"blur(6px)",strong:"blur(20px)"};var J={radius:{xs:"2px",sm:"4px",md:"8px",rounded:"100%"}},V=o({color:{strong:D.gray25,medium:D.gray20,light:D.gray15,secondaryInverted:D.gray50,inverted:D.gray60,danger:L.red20}},J),Z=o({color:{strong:D.gray55,medium:D.gray65,light:D.gray70,secondaryInverted:D.gray35,inverted:D.gray20,danger:L.red70}},J);var _={extraLight:"0px 1px 0px 0px ".concat(H(D.gray100,.04)),light:"0px 2px 4px 0px ".concat(H(D.gray100,.04),", 0px 0px 4px 0px ").concat(H(D.gray100,.08)),strong:"2px 4px 16px 0px ".concat(H(D.gray100,.12),", 0px 2px 4px 0px ").concat(H(D.gray100,.04))},K={extraLight:"0px 1px 0px 0px ".concat(H(D.gray100,.04)),light:"0px 2px 4px 0px ".concat(H(D.gray100,.04),", 0px 0px 4px 0px ").concat(H(D.gray100,.08)),strong:"2px 4px 16px 0px ".concat(H(D.gray100,.16),", 0px 2px 4px 0px ").concat(H(D.gray100,.08))};var U={size:{xxs:"0.625rem",xs:"0.85rem",sm:"0.92rem",md:"1rem",lg:"1.23rem",xl:"1.54rem",xxl:"1.85rem"},weight:{regular:400,medium:500,semiBold:600},family:"Inter, sans-serif"},Y=o({color:{primary:D.gray60,secondary:D.gray50,tertiary:D.gray40,light:D.gray35,extraLight:D.gray30,inverted:D.gray0,danger:L.red}},U),$=o({color:{primary:D.gray20,secondary:D.gray35,tertiary:D.gray45,light:D.gray50,extraLight:D.gray55,inverted:D.gray100,danger:L.red}},U);var Q={size:{sm:14,md:16,lg:20,xl:40},stroke:{sm:1.6,md:2,lg:2.5}};var X={size:{sm:"300px",md:"400px",lg:"53%"}};var rr={text:{green:L.green60,turquoise:L.turquoise60,sky:L.sky60,blue:L.blue60,purple:L.purple60,pink:L.pink60,red:L.red60,orange:L.orange60,yellow:L.yellow60,gray:L.gray60},background:{green:L.green20,turquoise:L.turquoise20,sky:L.sky20,blue:L.blue20,purple:L.purple20,pink:L.pink20,red:L.red20,orange:L.orange20,yellow:L.yellow20,gray:L.gray20}},re={text:{green:L.green10,turquoise:L.turquoise10,sky:L.sky10,blue:L.blue10,purple:L.purple10,pink:L.pink10,red:L.red10,orange:L.orange10,yellow:L.yellow10,gray:L.gray10},background:{green:L.green60,turquoise:L.turquoise60,sky:L.sky60,blue:L.blue60,purple:L.purple60,pink:L.pink60,red:L.red60,orange:L.orange60,yellow:L.yellow60,gray:L.gray60}};var rn={lineHeight:{lg:1.5,md:1.2},iconSizeMedium:16,iconSizeSmall:14,iconStrikeLight:1.6,iconStrikeMedium:2,iconStrikeBold:2.5};var rt={color:L,grayScale:D,icon:Q,modal:X,text:rn,blur:R,animation:E,snackBar:{success:{background:"#16A26B",color:"#D0F8E9"},error:{background:"#B43232",color:"#FED8D8"},info:{background:L.gray80,color:D.gray0}},spacingMultiplicator:4,spacing:function(r){return"".concat(r*4,"px")},betweenSiblingsGap:"2px",table:{horizontalCellMargin:"8px",checkboxColumnWidth:"32px"},rightDrawerWidth:"500px",clickableElementBackgroundTransition:"background 0.1s ease",lastLayerZIndex:2147483647},ra=i(o({},rt),{accent:W,background:G,border:V,tag:rr,boxShadow:_,font:Y,name:"light"}),ro=i(o({},rt),{accent:B,background:F,border:Z,tag:re,boxShadow:K,font:$,name:"dark"});var rc=C.default.div(s(),function(r){var e=r.theme;return e.color.blue}),ri=function(r){var e=v.useTheme();return w.jsx(rc,{children:w.jsx(k.IconCheck,{color:e.grayScale.gray0,size:14})})};var ru=function(r){var e=r.isAnimating,n=e===void 0?!1:e,t=r.color,a=r.duration,o=a===void 0?.5:a,c=r.size,i=c===void 0?28:c;var u=v.useTheme();return w.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 52 52",width:i,height:i,children:w.jsx(j.motion.path,{fill:"none",stroke:t!==null&&t!==void 0?t:u.grayScale.gray0,strokeWidth:4,d:"M14 27l7.8 7.8L38 14",pathLength:"1",strokeDasharray:"1",strokeDashoffset:n?"1":"0",animate:{strokeDashoffset:n?"0":"1"},transition:{duration:o}})})};var rl=C.default(O.Tooltip)(g(),function(r){var e=r.theme;return e.blur.strong},function(r){var e=r.theme;return H(e.color.gray80,.8)},function(r){var e=r.theme;return e.border.radius.sm},function(r){var e=r.theme;return e.boxShadow.light},function(r){var e=r.theme;return e.grayScale.gray0},function(r){var e=r.theme;return e.font.size.sm},function(r){var e=r.theme;return e.font.weight.regular},function(r){var e=r.theme;return e.spacing(2)},function(r){var e=r.theme;return e.lastLayerZIndex}),rd=function(r){var e=r.anchorSelect,n=r.className,t=r.content,a=r.delayHide,o=r.isOpen,c=r.noArrow,i=r.offset,u=r.place,l=r.positionStrategy;return w.jsx(rl,{anchorSelect:e,className:n,content:t,delayHide:a,isOpen:o,noArrow:c,offset:i,place:u,positionStrategy:l})};var rs=C.default.div(f(),function(r){var e=r.cursorPointer;return e?"pointer":"inherit"}),rg=function(r){var e=r.text;var n="title-id-".concat(q.v4()),t=S.useRef(null),a=u(S.useState(!1),2),o=a[0],c=a[1];return S.useEffect(function(){var r,n,a;var i;var u=((i=(r=e)===null||r===void 0?void 0:r.length)!==null&&i!==void 0?i:0)>0&&t.current?((n=t.current)===null||n===void 0?void 0:n.scrollHeight)>((a=t.current)===null||a===void 0?void 0:a.clientHeight)||t.current.scrollWidth>t.current.clientWidth:!1;o!==u&&c(u)},[o,e]),w.jsxs(w.Fragment,{children:[w.jsx(rs,{"data-testid":"tooltip",ref:t,id:n,cursorPointer:o,children:e}),o&&A.createPortal(w.jsx("div",{onClick:function(r){r.stopPropagation(),r.preventDefault()},children:w.jsx(rd,{anchorSelect:"#".concat(n),content:e!==null&&e!==void 0?e:"",delayHide:0,offset:5,noArrow:!0,place:"bottom",positionStrategy:"absolute"})}),document.body)]})};var rf=function(r){return r.Large="large",r.Small="small",r}(rf||{}),rp=function(r){return r.TextPrimary="text-primary",r.TextSecondary="text-secondary",r}(rp||{}),ry=function(r){return r.Highlighted="highlighted",r.Regular="regular",r.Transparent="transparent",r.Rounded="rounded",r}(ry||{}),rb=C.default.div(p(),function(r){var e=r.theme,n=r.variant;return n==="highlighted"?e.background.transparent.light:n==="rounded"?e.background.transparent.lighter:"transparent"},function(r){var e=r.theme,n=r.variant;return n==="rounded"?e.border.color.medium:"none"},function(r){var e=r.theme,n=r.variant;return n==="rounded"?"50px":e.border.radius.sm},function(r){var e=r.variant;return e==="rounded"?"solid":"none"},function(r){var e=r.variant;return e==="rounded"?"1px":"0px"},function(r){var e=r.theme,n=r.disabled,t=r.accent;return n?e.font.color.light:t==="text-primary"?e.font.color.primary:e.font.color.secondary},function(r){var e=r.clickable,n=r.disabled,t=r.variant;return n||t==="transparent"?"inherit":e?"pointer":"inherit"},function(r){var e=r.theme,n=r.accent;return n==="text-secondary"?e.font.weight.medium:"inherit"},function(r){var e=r.theme;return e.spacing(1)},function(r){var e=r.size;return e==="large"?"16px":"12px"},function(r){var e=r.maxWidth;return e||"200px"},function(r){var e=r.theme,n=r.variant;return n==="rounded"?"3px 8px":e.spacing(1)},function(r){var e=r.variant,n=r.theme,t=r.disabled;if(!t)return"background-color: "+(e==="highlighted"?n.background.transparent.medium:e==="regular"?n.background.transparent.light:"transparent")+";"},function(r){var e=r.variant,n=r.theme,t=r.disabled;if(!t)return"background-color: "+(e==="highlighted"?n.background.transparent.strong:e==="regular"?n.background.transparent.medium:"transparent")+";"}),rh=C.default.span(y()),rv=function(r){var e=r.size,n=e===void 0?"small":e,t=r.label,a=r.disabled,o=a===void 0?!1:a,c=r.clickable,i=c===void 0?!0:c,u=r.variant,l=u===void 0?"regular":u,d=r.leftComponent,s=r.rightComponent,g=r.accent,f=g===void 0?"text-primary":g,p=r.maxWidth,y=r.className;return w.jsxs(rb,{"data-testid":"chip",clickable:i,variant:l,accent:f,size:n,disabled:o,className:y,maxWidth:p,children:[d,w.jsx(rh,{children:w.jsx(rg,{text:t})}),s]})};var rm=C.default.span(b(),function(r){var e=r.theme;return e.background.transparent.light},function(r){var e=r.theme;return e.font.color.light},function(r){var e=r.theme;return e.font.size.xs},function(r){var e=r.theme;return e.font.weight.medium},function(r){var e=r.theme;return e.spacing(2)},function(r){var e=r.theme;return e.spacing(4)},function(r){var e=r.theme;return e.text.lineHeight.lg},function(r){var e=r.theme;return"0 ".concat(e.spacing(2))}),rx=function(){return w.jsx(rm,{children:"Soon"})};var rk=C.default.button(h(),function(r){var e=r.theme,n=r.variant,t=r.accent,a=r.disabled,o=r.focus;switch(n){case"primary":switch(t){case"default":return"\n              background: ".concat(e.background.secondary,";\n              border-color: ").concat(a?"transparent":o?e.color.blue:e.background.transparent.light,";\n              color: ").concat(a?e.font.color.extraLight:e.font.color.secondary,";\n              border-width: ").concat(!a&&o?"1px 1px !important":0,";\n              box-shadow: ").concat(!a&&o?"0 0 0 3px ".concat(e.accent.tertiary):"none",";\n              &:hover {\n                background: ").concat(a?e.background.secondary:e.background.tertiary,";\n              }\n              &:active {\n                background: ").concat(a?e.background.secondary:e.background.quaternary,";\n              }\n            ");case"blue":return"\n              background: ".concat(a?e.color.blue20:e.color.blue,";\n              border-color: ").concat(a?"transparent":o?e.color.blue:e.background.transparent.light,";\n              border-width: ").concat(!a&&o?"1px 1px !important":0,";\n              color: ").concat(e.grayScale.gray0,";\n              box-shadow: ").concat(!a&&o?"0 0 0 3px ".concat(e.accent.tertiary):"none",";\n              &:hover {\n                background: ").concat(a?e.color.blue20:e.color.blue50,";\n              }\n              &:active {\n                background: ").concat(a?e.color.blue20:e.color.blue60,";\n              }\n            ");case"danger":return"\n              background: ".concat(a?e.color.red20:e.color.red,";\n              border-color: ").concat(a?"transparent":o?e.color.red:e.background.transparent.light,";\n              border-width: ").concat(!a&&o?"1px 1px !important":0,";\n              box-shadow: ").concat(!a&&o?"0 0 0 3px ".concat(e.color.red10):"none",";\n              color: ").concat(e.grayScale.gray0,";\n              &:hover {\n                background: ").concat(a?e.color.red20:e.color.red50,";\n              }\n              &:active {\n                background: ").concat(a?e.color.red20:e.color.red50,";\n              }\n            ")}break;case"secondary":case"tertiary":switch(t){case"default":return"\n              background: ".concat(o?e.background.transparent.primary:"transparent",";\n              border-color: ").concat(n==="secondary"?!a&&o?e.color.blue:e.background.transparent.light:o?e.color.blue:"transparent",";\n              border-width: ").concat(!a&&o?"1px 1px !important":0,";\n              box-shadow: ").concat(!a&&o?"0 0 0 3px ".concat(e.accent.tertiary):"none",";\n              color: ").concat(a?e.font.color.extraLight:e.font.color.secondary,";\n              &:hover {\n                background: ").concat(a?"transparent":e.background.transparent.light,";\n              }\n              &:active {\n                background: ").concat(a?"transparent":e.background.transparent.light,";\n              }\n            ");case"blue":return"\n              background: ".concat(o?e.background.transparent.primary:"transparent",";\n              border-color: ").concat(n==="secondary"?o?e.color.blue:e.color.blue20:o?e.color.blue:"transparent",";\n              border-width: ").concat(!a&&o?"1px 1px !important":0,";\n              box-shadow: ").concat(!a&&o?"0 0 0 3px ".concat(e.accent.tertiary):"none",";\n              color: ").concat(a?e.accent.accent4060:e.color.blue,";\n              &:hover {\n                background: ").concat(a?"transparent":e.accent.tertiary,";\n              }\n              &:active {\n                background: ").concat(a?"transparent":e.accent.secondary,";\n              }\n            ");case"danger":return"\n              background: ".concat(a?"transparent":e.background.transparent.primary,";\n              border-color: ").concat(n==="secondary"?o?e.color.red:e.color.red20:o?e.color.red:"transparent",";\n              border-width: ").concat(!a&&o?"1px 1px !important":0,";\n              box-shadow: ").concat(!a&&o?"0 0 0 3px ".concat(e.color.red10):"none",";\n              color: ").concat(a?e.color.red20:e.font.color.danger,";\n              &:hover {\n                background: ").concat(a?"transparent":e.background.danger,";\n              }\n              &:active {\n                background: ").concat(a?"transparent":e.background.danger,";\n              }\n            ")}}},function(r){var e=r.position,n=r.theme;switch(e){case"left":return"".concat(n.border.radius.sm," 0px 0px ").concat(n.border.radius.sm);case"right":return"0px ".concat(n.border.radius.sm," ").concat(n.border.radius.sm," 0px");case"middle":return"0px";case"standalone":return n.border.radius.sm}},function(r){var e=r.variant,n=r.position;switch(e){case"primary":case"secondary":return n==="middle"?"1px 0px":"1px";case"tertiary":return"0"}},function(r){var e=r.disabled;return e?"not-allowed":"pointer"},function(r){var e=r.theme;return e.font.family},function(r){var e=r.theme;return e.spacing(1)},function(r){var e=r.size;return e==="small"?"24px":"32px"},function(r){var e=r.theme;return"0 ".concat(e.spacing(2))},function(r){var e=r.fullWidth;return e?"100%":"auto"}),rw=function(r){var e=r.className,n=r.Icon,t=r.title,a=r.fullWidth,o=a===void 0?!1:a,c=r.variant,i=c===void 0?"primary":c,u=r.size,l=u===void 0?"medium":u,d=r.accent,s=d===void 0?"default":d,g=r.position,f=g===void 0?"standalone":g,p=r.soon,y=p===void 0?!1:p,b=r.disabled,h=b===void 0?!1:b,m=r.focus,x=m===void 0?!1:m,k=r.onClick;var j=v.useTheme();return w.jsxs(rk,{fullWidth:o,variant:i,size:l,position:f,disabled:y||h,focus:x,accent:s,className:e,onClick:k,children:[n&&w.jsx(n,{size:j.icon.size.sm}),t,y&&w.jsx(rx,{})]})};Object.defineProperty(exports,"ThemeProvider",{enumerable:true,get:function r(){return v.ThemeProvider}});exports.AnimatedCheckmark=ru;exports.Button=rw;exports.Checkmark=ri;exports.Chip=rv;exports.ChipAccent=rp;exports.ChipSize=rf;exports.ChipVariant=ry;exports.darkTheme=ro;exports.lightTheme=ra;