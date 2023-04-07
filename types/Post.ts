export interface Post {
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
  status: PostStatus;
  meta: Meta;
}

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface Meta {
  slug: string;
  author: string;
  publishedAt: number;
  url: string;
  image?: string;
  description?: string;
  title?: string;
}

export interface Option {
  label: string;
  value: string;
}
