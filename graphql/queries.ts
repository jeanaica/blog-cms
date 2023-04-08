import { gql } from '@apollo/client';

export const GET_ALL_POST_IDS = gql`
  query Posts {
    posts {
      id
    }
  }
`;

export const GET_POST_BY_STATUS = gql`
  query Posts($status: String) {
    posts(status: $status) {
      id
      title
      content
      updatedAt
      status
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      createdAt
      content
      title
      banner
      updatedAt
      status
      scheduledAt
      publishedAt
      meta {
        author
        slug
        url
        description
        image
        publishedAt
        updatedAt
        title
      }
      category {
        label
        value
      }
      tags {
        value
        label
      }
    }
  }
`;
