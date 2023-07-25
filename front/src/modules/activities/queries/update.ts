import { gql } from '@apollo/client';

export const ADD_ACTIVITY_TARGETS = gql`
  mutation AddActivityTargetsOnActivity(
    $activityId: String!
    $activityTargetInputs: [ActivityTargetCreateManyActivityInput!]!
  ) {
    updateOneActivity(
      where: { id: $activityId }
      data: { activityTargets: { createMany: { data: $activityTargetInputs } } }
    ) {
      id
      createdAt
      updatedAt
      activityTargets {
        id
        createdAt
        updatedAt
        personId
        companyId
      }
    }
  }
`;

export const REMOVE_ACTIVITY_TARGETS = gql`
  mutation RemoveActivityTargetsOnActivity(
    $activityId: String!
    $activityTargetIds: [String!]!
  ) {
    updateOneActivity(
      where: { id: $activityId }
      data: {
        activityTargets: { deleteMany: { id: { in: $activityTargetIds } } }
      }
    ) {
      id
      createdAt
      updatedAt
      activityTargets {
        id
        createdAt
        updatedAt
        personId
        companyId
      }
    }
  }
`;

export const DELETE_ACTIVITY = gql`
  mutation DeleteActivity($activityId: String!) {
    deleteManyActivities(where: { id: { equals: $activityId } }) {
      count
    }
  }
`;

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity(
    $id: String!
    $body: String
    $title: String
    $type: ActivityType
  ) {
    updateOneActivity(
      where: { id: $id }
      data: { body: $body, title: $title, type: $type }
    ) {
      id
      body
      title
      type
    }
  }
`;

export const UPLOAD_ATTACHMENT = gql`
  mutation UploadAttachment($file: Upload!, $activityId: String!) {
    uploadAttachment(file: $file, activityId: $activityId)
  }
`;
