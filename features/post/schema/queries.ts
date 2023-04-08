import { gql } from '@apollo/client';

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
