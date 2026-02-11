import { gql } from '@apollo/client';

export const UPDATE_ARTICLE = gql`
  mutation UpdatePost($id: ID!, $post: PostUpdate!) {
    updatePost(id: $id, post: $post) {
      id
      content
      contentBlocks {
        ... on TextBlock {
          type
          order
          content
        }
        ... on ImageBlock {
          type
          order
          url
          alt
          caption
        }
        ... on GalleryBlock {
          type
          order
          galleryName
          images {
            url
            alt
            caption
          }
        }
      }
      title
      banner
      caption
      status
      scheduledAt
      meta {
        url
        title
        slug
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

export const ADD_ARTICLE = gql`
  mutation Mutation($post: PostInput!) {
    createPost(post: $post) {
      id
      content
      contentBlocks {
        ... on TextBlock {
          type
          order
          content
        }
        ... on ImageBlock {
          type
          order
          url
          alt
          caption
        }
        ... on GalleryBlock {
          type
          order
          galleryName
          images {
            url
            alt
            caption
          }
        }
      }
      title
      banner
      caption
      status
      scheduledAt
      meta {
        url
        title
        slug
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
