import { gql } from '@apollo/client';

export const ADD_THOUGHT = gql`
  mutation CreateThought($input: ThoughtInput!) {
    createThought(input: $input) {
      id
      text
      image {
        url
        caption
      }
      tags
      isQuote
      status
      publishDate
    }
  }
`;

export const UPDATE_THOUGHT = gql`
  mutation UpdateThought($id: ID!, $input: UpdateThoughtInput) {
    updateThought(id: $id, input: $input) {
      id
      text
      image {
        url
        caption
      }
      tags
      isQuote
      status
      publishDate
    }
  }
`;

export const DELETE_THOUGHT = gql`
  mutation DeleteThought($id: ID!) {
    deleteThought(id: $id) {
      id
    }
  }
`;
