import { ImageInput } from './Image';
import { Status } from './Status';

export interface GalleryInput {
  title: string;
  description?: string;
  images: ImageInput[];
  status: Status;
  scheduledAt?: string | null;
}
