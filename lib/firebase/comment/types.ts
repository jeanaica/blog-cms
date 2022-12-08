import { Timestamp } from 'firebase/firestore';

export interface Option {
  label: string;
  value: string;
}

export interface Comment {
  id: string;
  name: string;
  postId: string;
  postTitle: string;
  comment: string;
  modifiedDate?: string;
  publishedDate?: string;
  postedDate: string;
  isUnread: boolean;
  isReply: boolean;
}

export interface CommentAPI {
  id: string;
  name: string;
  postId: string;
  postTitle: string;
  comment: string;
  modifiedDate?: Timestamp;
  publishedDate?: Timestamp;
  postedDate: Timestamp;
  isUnread: boolean;
  isReply: boolean;
}

export interface Params {
  postId?: string;
  isUnread?: boolean;
  sort?: string;
  nextItem?: string;
  max?: number;
}

export type Comments = Array<Comment>;
