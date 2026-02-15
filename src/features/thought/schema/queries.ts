import { gql } from '@apollo/client';

export const GET_THOUGHTS = gql`
  query Thoughts($status: String, $sort: String, $limit: Int, $offset: Int, $tag: String) {
    thoughts(status: $status, sort: $sort, limit: $limit, offset: $offset, tag: $tag) {
      id
      text
      image {
        url
        caption
      }
      tags
      isQuote
      createdAt
      updatedAt
      status
      publishDate
    }
  }
`;

export const GET_THOUGHT_BY_ID = gql`
  query Thought($id: ID!) {
    thought(id: $id) {
      id
      text
      image {
        url
        caption
      }
      tags
      isQuote
      createdAt
      updatedAt
      status
      publishDate
    }
  }
`;
