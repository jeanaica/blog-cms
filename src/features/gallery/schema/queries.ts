import { gql } from '@apollo/client';

export const GET_GALLERIES = gql`
  query Galleries($status: String, $limit: Int, $offset: Int, $sort: String) {
    galleries(status: $status, limit: $limit, offset: $offset, sort: $sort) {
      id
      title
      description
      images {
        url
        alt
        caption
        order
      }
      createdInPostId
      createdAt
      updatedAt
      publishedAt
      scheduledAt
      archivedAt
      status
    }
  }
`;

export const GET_GALLERY = gql`
  query Gallery($id: ID!) {
    gallery(id: $id) {
      id
      title
      description
      images {
        url
        alt
        caption
        order
      }
      createdInPostId
      createdAt
      updatedAt
      publishedAt
      scheduledAt
      archivedAt
      status
    }
  }
`;
