export type GalleryStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

export interface Gallery {
  id: string;
  title: string;
  description?: string;
  images: GalleryImage[];
  createdInPostId?: string;
  createdAt: number;
  updatedAt?: number;
  publishedAt?: number;
  scheduledAt?: number;
  archivedAt?: number;
  status: GalleryStatus;
}
