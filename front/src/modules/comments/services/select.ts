import { gql } from '@apollo/client';

export const GET_COMMENT_THREADS_BY_TARGETS = gql`
  query GetCommentThreadsByTargets(
    $commentThreadTargetIds: [String!]!
    $orderBy: [CommentThreadOrderByWithRelationInput!]
  ) {
    findManyCommentThreads(
      orderBy: $orderBy
      where: {
        commentThreadTargets: {
          some: { commentableId: { in: $commentThreadTargetIds } }
        }
      }
    ) {
      id
      createdAt
      title
      body
      author {
        id
        firstName
        lastName
      }
      comments {
        id
        body
        createdAt
        updatedAt
        author {
          id
          displayName
          firstName
          lastName
          avatarUrl
        }
      }
      commentThreadTargets {
        id
        commentableId
        commentableType
      }
    }
  }
`;

export const GET_COMMENT_THREAD = gql`
  query GetCommentThread($commentThreadId: String!) {
    findManyCommentThreads(where: { id: { equals: $commentThreadId } }) {
      id
      createdAt
      author {
        id
        firstName
        lastName
      }
      comments {
        id
        body
        createdAt
        updatedAt
        author {
          id
          displayName
          firstName
          lastName
          avatarUrl
        }
      }
      commentThreadTargets {
        id
        commentableId
        commentableType
      }
    }
  }
`;
