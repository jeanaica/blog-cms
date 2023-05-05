import { gql } from '@apollo/client';

export const GET_POST_BY_STATUS = gql`
  query Posts($status: String, $sort: String) {
    posts(status: $status, sort: $sort) {
      id
      title
      content
      updatedAt
      status
    }
  }
`;
