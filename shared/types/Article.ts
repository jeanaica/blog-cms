import { Option } from 'shared/types/Option';

import { Meta } from './Meta';
import { Status } from './Status';

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  updatedAt: number;
  banner: string;
  category: Array<Option>;
  tags: Array<Option>;
  publishedAt?: number;
  scheduledAt?: number;
  archivedAt?: number;
  status: Status;
  meta: Meta;
}
