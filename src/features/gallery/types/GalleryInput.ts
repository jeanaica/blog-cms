import { type GalleryStatus } from './Gallery';
import { type ImageItem } from 'components/form/MultiImageUpload';

export interface GalleryInput {
  title: string;
  description?: string;
  images: ImageItem[];
  status: GalleryStatus;
  scheduledAt?: string | null;
}
