import { Option } from 'lib/firebase/comment/types';

export interface ArticleForm {
  id: string;
  title: string;
  banner: File | string;
  content: string;
  createdDate: string;
  category: Array<Option>;
  tags: Array<Option>;
  postDate: string | null;
  slug: string;
  author: string;
  description: string;
  url: string;
  modifiedDate?: string;
  publishedDate?: string;
  isDraft?: boolean;
  isScheduled?: boolean;
  isPublished?: boolean;
  isUnpublished?: boolean;
}
