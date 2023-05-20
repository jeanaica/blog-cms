import { Option } from 'lib/firebase/comment/types';

export interface ArticleInput {
  id: string;
  title: string;
  banner: string;
  caption: string;
  content: string;
  createdDate: string;
  category: Array<Option>;
  tags: Array<Option>;
  scheduledAt: string | null;
  slug: string;
  author: string;
  description: string;
  url: string;
  imageAlt: string;
}

export type FormKeys = keyof ArticleInput;
export type FormValues = string | Option[] | null;
