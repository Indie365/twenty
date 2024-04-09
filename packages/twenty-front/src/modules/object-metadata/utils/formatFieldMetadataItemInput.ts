import toCamelCase from 'lodash.camelcase';
import toSnakeCase from 'lodash.snakecase';

import { Field, FieldMetadataType } from '~/generated-metadata/graphql';
import { isDefined } from '~/utils/isDefined.ts';

import { FieldMetadataOption } from '../types/FieldMetadataOption';

export const getOptionValueFromLabel = (label: string) => {
  // Remove accents
  const unaccentedLabel = label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  // Remove special characters
  const noSpecialCharactersLabel = unaccentedLabel.replace(
    /[^a-zA-Z0-9 ]/g,
    '',
  );

  return toSnakeCase(noSpecialCharactersLabel).toUpperCase();
};

export const formatFieldMetadataItemInput = (
  input: Pick<Field, 'label' | 'icon' | 'description' | 'defaultValue'> & {
    options?: FieldMetadataOption[];
    type?: FieldMetadataType;
  },
) => {
  let defaultValue = input.defaultValue;
  if (input.type === FieldMetadataType.MultiSelect) {
    const defaultOptions = input.options?.filter((option) => option.isDefault);
    if (isDefined(defaultOptions)) {
      defaultValue = defaultOptions.map(
        (defaultOption) => `'${getOptionValueFromLabel(defaultOption.label)}'`,
      );
    }
  }
  if (input.type === FieldMetadataType.Select) {
    const defaultOption = input.options?.find((option) => option.isDefault);
    defaultValue = isDefined(defaultOption)
      ? `'${getOptionValueFromLabel(defaultOption.label)}'`
      : null;
  }

  // Check if options has unique values
  if (input.options !== undefined) {
    // Compute the values based on the label
    const values = input.options.map((option) =>
      getOptionValueFromLabel(option.label),
    );

    if (new Set(values).size !== input.options.length) {
      throw new Error(
        `Options must have unique values, but contains the following duplicates ${values.join(
          ', ',
        )}`,
      );
    }
  }

  return {
    defaultValue,
    description: input.description?.trim() ?? null,
    icon: input.icon,
    label: input.label.trim(),
    name: toCamelCase(input.label.trim()),
    options: input.options?.map((option, index) => ({
      color: option.color,
      id: option.id,
      label: option.label.trim(),
      position: index,
      value: getOptionValueFromLabel(option.label),
    })),
  };
};
