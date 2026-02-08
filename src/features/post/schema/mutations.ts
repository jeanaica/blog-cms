import { gql } from '@apollo/client';

export const UPDATE_POST_STATUS_MUTATION = gql`
  mutation UpdatePost($id: ID!, $post: PostUpdate!) {
    updatePost(id: $id, post: $post) {
      id
      status
    }
  }
`;
