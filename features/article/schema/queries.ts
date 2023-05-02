import { gql } from '@apollo/client';

export const GET_ALL_ARTICLE_IDS = gql`
  query Posts {
    posts {
      id
    }
  }
`;

export const GET_ARTICLE_BY_ID = gql`
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

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      label
      value
      notRemovable
    }
  }
`;

export const GET_TAGS = gql`
  query Tags {
    tags {
      label
      value
      notRemovable
    }
  }
`;
