import { useContext } from 'react';
import { useRecoilState } from 'recoil';

import { FieldContext } from '../../contexts/FieldContext';
import { useFieldInitialValue } from '../../hooks/useFieldInitialValue';
import { entityFieldsFamilySelector } from '../../states/selectors/entityFieldsFamilySelector';
import { assertFieldMetadata } from '../../types/guards/assertFieldMetadata';
import { isFieldText } from '../../types/guards/isFieldText';

export const useTextField = () => {
  const { entityId, fieldDefinition, hotkeyScope } = useContext(FieldContext);

  assertFieldMetadata('text', isFieldText, fieldDefinition);

  const fieldName = fieldDefinition.metadata.fieldName;

  const [fieldValue, setFieldValue] = useRecoilState<string>(
    entityFieldsFamilySelector({
      entityId: entityId,
      fieldName: fieldName,
    }),
  );

  const fieldInitialValue = useFieldInitialValue();

  const initialValue = fieldInitialValue?.isEmpty
    ? ''
    : fieldInitialValue?.value ?? fieldValue;

  return {
    entityId,
    fieldDefinition,
    fieldValue,
    initialValue,
    setFieldValue,
    hotkeyScope,
  };
};
