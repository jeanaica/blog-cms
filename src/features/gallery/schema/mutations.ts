import { gql } from '@apollo/client';

export const CREATE_GALLERY = gql`
  mutation CreateGallery($gallery: GalleryInput!) {
    createGallery(gallery: $gallery) {
      id
      title
      description
      images {
        url
        alt
        caption
        order
      }
      createdInPostId
      createdAt
      updatedAt
      publishedAt
      scheduledAt
      archivedAt
      status
    }
  }
`;

export const UPDATE_GALLERY = gql`
  mutation UpdateGallery($id: ID!, $gallery: GalleryUpdate!) {
    updateGallery(id: $id, gallery: $gallery) {
      id
      title
      description
      images {
        url
        alt
        caption
        order
      }
      createdInPostId
      createdAt
      updatedAt
      publishedAt
      scheduledAt
      archivedAt
      status
    }
  }
`;

export const DELETE_GALLERY = gql`
  mutation DeleteGallery($id: ID!) {
    deleteGallery(id: $id) {
      id
      status
    }
  }
`;

export const UPDATE_GALLERY_STATUS = gql`
  mutation UpdateGalleryStatus($id: ID!, $gallery: GalleryUpdate!) {
    updateGallery(id: $id, gallery: $gallery) {
      id
      status
    }
  }
`;
