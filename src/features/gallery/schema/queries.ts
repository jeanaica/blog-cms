import { gql } from '@apollo/client';

export const GET_GALLERIES = gql`
  query Galleries($status: String, $sort: String) {
    galleries(status: $status, sort: $sort) {
      id
      title
      description
      images {
        url
        alt
        caption
        order
      }
      status
      createdAt
      updatedAt
      publishedAt
      scheduledAt
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
      status
      createdAt
      updatedAt
      publishedAt
      scheduledAt
    }
  }
`;
