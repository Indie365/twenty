import { FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { RelationType } from '@/settings/data-model/types/RelationType';
import {
  FieldMetadataType,
  RelationMetadataType,
} from '~/generated-metadata/graphql';

export const getRelationTargetFromRelationSource = ({
  objectMetadataItems,
  relationSourceFieldMetadataItem,
}: {
  objectMetadataItems: ObjectMetadataItem[];
  relationSourceFieldMetadataItem: FieldMetadataItem;
}) => {
  if (relationSourceFieldMetadataItem.type !== FieldMetadataType.Relation) {
    return null;
  }

  const relationMetadataItem =
    relationSourceFieldMetadataItem.fromRelationMetadata ||
    relationSourceFieldMetadataItem.toRelationMetadata;

  if (!relationMetadataItem) return null;

  const relationSourceFieldMetadataItemId =
    'toFieldMetadataId' in relationMetadataItem
      ? relationMetadataItem.toFieldMetadataId
      : relationMetadataItem.fromFieldMetadataId;

  if (!relationSourceFieldMetadataItemId) return null;

  // TODO: precise naming, is it relationTypeFromTargetPointOfView or relationTypeFromSourcePointOfView ?
  const relationType =
    relationMetadataItem.relationType === RelationMetadataType.OneToMany &&
    relationSourceFieldMetadataItem.toRelationMetadata
      ? ('MANY_TO_ONE' satisfies RelationType)
      : (relationMetadataItem.relationType as RelationType);

  const relationTargetObjectMetadataNameSingular =
    'toObjectMetadata' in relationMetadataItem
      ? relationMetadataItem.toObjectMetadata.nameSingular
      : relationMetadataItem.fromObjectMetadata.nameSingular;

  const relationTargetObjectMetadataItem = objectMetadataItems.find(
    (item) => item.nameSingular === relationTargetObjectMetadataNameSingular,
  );

  if (!relationTargetObjectMetadataItem) return null;

  const relationTargetFieldMetadataItem =
    relationTargetObjectMetadataItem.fields.find(
      (field) => field.id === relationSourceFieldMetadataItemId,
    );

  if (!relationTargetFieldMetadataItem) return null;

  return {
    relationTargetFieldMetadataItem,
    relationTargetObjectMetadataItem,
    relationType,
  };
};
