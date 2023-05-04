import { gql } from '@apollo/client';

export const UPDATE_ARTICLE_MUTATION = gql`
  mutation UpdatePost($id: ID!, $post: PostUpdate!) {
    updatePost(id: $id, post: $post) {
      id
      status
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation Mutation($post: PostInput!) {
    createPost(post: $post) {
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
        url
        updatedAt
        title
        slug
        publishedAt
        keywords
        imageAlt
        image
        description
        author
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

export const ADD_TAG = gql`
  mutation Mutation($tag: String!) {
    createTag(tag: $tag) {
      value
      label
    }
  }
`;
