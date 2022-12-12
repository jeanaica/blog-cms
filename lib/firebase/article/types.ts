import { Timestamp } from 'firebase/firestore';

export interface Option {
  label: string;
  value: string;
}

export interface Article {
  id: string;
  title: string;
  banner: File;
  content: string;
  createdDate: string;
  category: Array<Option>;
  tags: Array<Option>;
  modifiedDate: string;
  publishedDate?: string;
  postDate: string;
}

export interface ArticleAPI {
  id: string;
  title: string;
  banner: string;
  content: string;
  createdDate: Timestamp;
  category: Array<Option>;
  tags: Array<Option>;
  modifiedDate: Timestamp;
  publishedDate?: Timestamp;
  postDate?: Timestamp;
  isDraft: boolean;
  isPublished: boolean;
  isScheduled: boolean;
}

export interface Meta {
  slug: string;
  author: string;
  publishedDate: string;
  image: string;
  description: string;
  title: string;
  url: string;
}

export interface Params {
  sort?: string;
  nextItem?: string;
  max?: number;
}

export type Categories = Array<Option>;

export type Tags = Array<Option>;
