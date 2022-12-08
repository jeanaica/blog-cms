import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { convertSecondsToTimeStamp } from 'lib/utils/dateConverter';

import { mapComments } from 'lib/utils/mapComments';

import { db } from '../client';
import { CommentAPI, Comments, Params } from './types';

export const getAllComments = async () => {
  const docRef = collection(db, 'comment') as CollectionReference<CommentAPI>;
  const docSnap = await getDocs(docRef);

  const comments = docSnap.forEach(mapComments) as unknown as Comment;

  return comments;
};

export const getComment = async (id: string) => {
  if (!id) throw new Error('');
  const docRef = doc(db, 'comment', id);

  const docSnap = await getDoc(docRef);
  const {
    name,
    postId,
    postTitle,
    comment,
    isUnread,
    isReply,
    modifiedDate,
    publishedDate,
    postedDate,
  } = docSnap.data() as CommentAPI;

  return {
    id: docRef.id,
    name,
    postId,
    postTitle,
    comment,
    isUnread,
    isReply,
    modifiedDate: convertSecondsToTimeStamp(modifiedDate),
    publishedDate: convertSecondsToTimeStamp(publishedDate),
    postedDate: convertSecondsToTimeStamp(postedDate),
  };
};

export const getPostComments = async ({
  postId = '',
  sort = 'postedDate',
  max = 25,
  nextItem = '',
}: Params) => {
  const comments: Comments = [];

  const q = query(
    collection(db, 'comment'),
    where('postId', '==', postId),
    where('publishedDate', '!=', null),
    orderBy('publishedDate', 'desc'),
    orderBy(sort, 'desc'),
    startAfter(nextItem),
    limit(max)
  ) as CollectionReference<CommentAPI>;

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(comment => comments.push(mapComments(comment)));

  return comments;
};

export const getUnread = async ({
  sort = 'postedDate',
  max = 25,
  nextItem = '',
}: Params) => {
  const comments: Comments = [];

  const q = query(
    collection(db, 'comment'),
    where('isUnread', '==', true),
    orderBy(sort, 'desc'),
    startAfter(nextItem),
    limit(max)
  ) as CollectionReference<CommentAPI>;

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(comment => comments.push(mapComments(comment)));

  return comments;
};

export const getRead = async ({
  sort = 'postedDate',
  max = 25,
  nextItem = '',
}: Params) => {
  const comments: Comments = [];

  const q = query(
    collection(db, 'comment'),
    where('isUnread', '==', false),
    orderBy(sort, 'desc'),
    startAfter(nextItem),
    limit(max)
  ) as CollectionReference<CommentAPI>;

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(comment => comments.push(mapComments(comment)));

  return comments;
};

export const getReplies = async ({
  sort = 'postedDate',
  max = 25,
  nextItem = '',
}: Params) => {
  const comments: Comments = [];

  const q = query(
    collection(db, 'comment'),
    where('isReply', '==', true),
    orderBy(sort, 'desc'),
    startAfter(nextItem),
    limit(max)
  ) as CollectionReference<CommentAPI>;

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(comment => comments.push(mapComments(comment)));

  return comments;
};
