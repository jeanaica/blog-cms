import { doc, getDoc } from 'firebase/firestore';
import { convertSecondsToTimeStamp } from 'lib/utils/dateConverter';

import { db } from '../client';
import { ArticleAPI, Categories, Tags } from './types';

export const getArticle = async (id: string) => {
  if (!id) throw new Error('');
  const docRef = doc(db, 'article', id);

  const docSnap = await getDoc(docRef);
  const {
    title,
    banner,
    content,
    createdDate,
    category,
    tags,
    modifiedDate,
    publishedDate,
    postDate,
  } = docSnap.data() as ArticleAPI;

  return {
    id: docRef.id,
    title,
    banner,
    content,
    createdDate,
    category,
    tags,
    modifiedDate: convertSecondsToTimeStamp(modifiedDate),
    publishedDate: convertSecondsToTimeStamp(publishedDate),
    postDate: convertSecondsToTimeStamp(postDate),
  };
};

export const getCategories = async () => {
  const docRef = doc(db, 'post', 'list');

  const docSnap = (await (
    await getDoc(docRef)
  ).get('categories')) as Categories;

  return docSnap;
};

export const getTags = async () => {
  const docRef = doc(db, 'post', 'list');

  const docSnap = (await (await getDoc(docRef)).get('tags')) as Tags;

  return docSnap;
};
