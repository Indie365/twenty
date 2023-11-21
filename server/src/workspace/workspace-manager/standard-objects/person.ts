import { FieldMetadataType } from 'src/metadata/field-metadata/field-metadata.entity';

const personMetadata = {
  nameSingular: 'person',
  namePlural: 'people',
  labelSingular: 'Person',
  labelPlural: 'People',
  targetTableName: 'person',
  description: 'A person',
  icon: 'IconUser',
  isActive: true,
  isSystem: false,
  fields: [
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.FULL_NAME,
      name: 'name',
      label: 'Name',
      targetColumnMap: {
        firstName: 'nameFirstName',
        lastName: 'nameLastName',
      },
      description: 'Contact’s name',
      icon: 'IconUser',
      isNullable: false,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.EMAIL,
      name: 'email',
      label: 'Email',
      targetColumnMap: {
        value: 'email',
      },
      description: 'Contact’s Email',
      icon: 'IconMail',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.LINK,
      name: 'linkedinLink',
      label: 'Linkedin',
      targetColumnMap: {
        label: 'linkedinLinkLabel',
        url: 'linkedinLinkUrl',
      },
      description: 'Contact’s Linkedin account',
      icon: 'IconBrandLinkedin',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.LINK,
      name: 'xLink',
      label: 'X',
      targetColumnMap: {
        label: 'xLinkLabel',
        url: 'xLinkUrl',
      },
      description: 'Contact’s X/Twitter account',
      icon: 'IconUser',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.TEXT,
      name: 'jobTitle',
      label: 'Job Title',
      targetColumnMap: {
        value: 'jobTitle',
      },
      description: 'Contact’s job title',
      icon: 'IconBriefcase',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.TEXT,
      name: 'phone',
      label: 'Phone',
      targetColumnMap: {
        value: 'phone',
      },
      description: 'Contact’s phone number',
      icon: 'IconPhone',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.TEXT,
      name: 'city',
      label: 'City',
      targetColumnMap: {
        value: 'city',
      },
      description: 'Contact’s city',
      icon: 'IconMap',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.TEXT,
      name: 'avatarUrl',
      label: 'Avatar',
      targetColumnMap: {
        value: 'avatarUrl',
      },
      description: 'Contact’s avatar',
      icon: 'IconFileUpload',
      isNullable: false,
    },
    // Relations
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'company',
      label: 'Company',
      targetColumnMap: {},
      description: 'Contact’s company',
      icon: 'IconBuildingSkyscraper',
      isNullable: true,
      isSystem: false,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.UUID,
      name: 'companyId',
      label: 'Company ID (foreign key)',
      targetColumnMap: {},
      description: 'Foreign key for company',
      icon: undefined,
      isNullable: true,
      isSystem: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'pointOfContactForOpportunities',
      label: 'POC for Opportunities',
      targetColumnMap: {},
      description: 'Point of Contact for Opportunities',
      icon: 'IconArrowTarget',
      isNullable: false,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'activityTargets',
      label: 'Activities',
      targetColumnMap: {},
      description: 'Activities tied to the contact',
      icon: 'IconCheckbox',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'opportunities',
      label: 'Opportunities',
      targetColumnMap: {},
      description: 'Opportunities linked to the contact.',
      icon: 'IconTargetArrow',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'favorites',
      label: 'Favorites',
      targetColumnMap: {},
      description: 'Favorites linked to the contact',
      icon: 'IconHeart',
      isNullable: true,
    },
    {
      isCustom: false,
      isActive: true,
      type: FieldMetadataType.RELATION,
      name: 'attachments',
      label: 'Attachments',
      targetColumnMap: {},
      description: 'Attachments linked to the contact.',
      icon: 'IconFileImport',
      isNullable: true,
    },
  ],
};

export default personMetadata;
