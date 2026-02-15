export type ThoughtStatus = 'draft' | 'published' | 'scheduled';

export interface ThoughtImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Thought {
  id: string;
  text: string;
  image?: ThoughtImage | null;
  tags?: string[];
  isQuote: boolean;
  createdAt: number;
  updatedAt: number;
  status: ThoughtStatus;
  publishDate?: number | null;
}

export interface ThoughtInput {
  text: string;
  image?: ThoughtImage | null;
  tags?: string[];
  isQuote: boolean;
  status: ThoughtStatus;
  publishDate?: string | null;
}

export interface UpdateThoughtInput {
  text?: string;
  image?: ThoughtImage | null;
  tags?: string[];
  isQuote?: boolean;
  status?: ThoughtStatus;
  publishDate?: string | null;
}
