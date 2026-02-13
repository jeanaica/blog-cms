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
      status
      publishedAt
      scheduledAt
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
      status
      publishedAt
      scheduledAt
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

export const DELETE_GALLERY = gql`
  mutation DeleteGallery($id: ID!) {
    deleteGallery(id: $id) {
      id
    }
  }
`;
