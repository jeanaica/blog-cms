import { Status } from './Status';
import { Image } from './Image';

export interface Gallery {
  id: string;
  title: string;
  description?: string;
  images: Image[];
  status: Status;
  createdAt?: number;
  updatedAt?: number;
  publishedAt?: number;
  scheduledAt?: number;
}
