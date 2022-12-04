import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { mapPosts } from 'lib/utils/mapPosts';

import { db } from '../client';
import { Params, PostAPI, Posts } from './types';

export const getAllPosts = async () => {
  const docRef = collection(db, 'post') as CollectionReference<PostAPI>;
  const docSnap = await getDocs(docRef);

  const posts = docSnap.forEach(mapPosts) as unknown as Posts;

  return posts;
};

export const getDrafts = async ({
  sort = 'modifiedDate',
  max = 25,
  nextItem = '',
}: Params) => {
  const posts: Posts = [];

  const q = query(
    collection(db, 'post'),
    where('isDraft', '==', true),
    orderBy(sort, 'desc'),
    startAfter(nextItem),
    limit(max)
  ) as CollectionReference<PostAPI>;

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(post => posts.push(mapPosts(post)));

  return posts;
};

export const getScheduledPosts = async ({
  sort = 'postDate',
  max = 25,
  nextItem = '',
}: Params) => {
  const posts: Posts = [];

  const q = query(
    collection(db, 'post'),
    where('isScheduled', '==', true),
    orderBy(sort, 'desc'),
    startAfter(nextItem),
    limit(max)
  ) as CollectionReference<PostAPI>;

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(post => posts.push(mapPosts(post)));

  return posts;
};

export const getPublishedPosts = async ({
  sort = 'publishedDate',
  max = 25,
  nextItem = '',
}: Params) => {
  const posts: Posts = [];

  const q = query(
    collection(db, 'post'),
    where('isPublished', '==', true),
    orderBy(sort, 'desc'),
    startAfter(nextItem),
    limit(max)
  ) as CollectionReference<PostAPI>;

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(post => posts.push(mapPosts(post)));

  return posts;
};

export const getUnpublishedPosts = async ({
  sort = 'publishedDate',
  max = 25,
  nextItem = '',
}: Params) => {
  const posts: Posts = [];

  const q = query(
    collection(db, 'post'),
    where('isPublished', '==', false),
    where('isDraft', '==', false),
    where('isScheduled', '==', false),
    orderBy(sort, 'desc'),
    startAfter(nextItem),
    limit(max)
  ) as CollectionReference<PostAPI>;

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(post => posts.push(mapPosts(post)));

  return posts;
};
