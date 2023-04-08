export interface Meta {
  slug: string;
  title?: string;
  url: string;
  author: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  publishedAt?: number;
  updatedAt: number;
  keywords?: Array<string>;
}
