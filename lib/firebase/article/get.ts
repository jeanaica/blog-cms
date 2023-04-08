import { ArticleForm } from 'features/article/shared/types';
import { doc, getDoc } from 'firebase/firestore';
import {
  convertSecondsToTimeStamp,
  convertTimeStampToForm,
} from 'shared/utils/dateConverter';

import { db } from '../client';
import { ArticleAPI, Categories, Tags } from './types';

export const getArticle = async (id: string) => {
  if (!id) throw new Error('');

  const docRef = doc(db, 'post', id);

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
    meta,
    isDraft,
    isPublished,
    isScheduled,
    isUnpublished,
  } = docSnap.data() as ArticleAPI;

  return {
    id: docRef.id,
    title,
    banner,
    content,
    createdDate: convertSecondsToTimeStamp(createdDate),
    category,
    tags,
    slug: meta.slug,
    description: meta.description,
    author: meta.author,
    url: meta.url,
    modifiedDate: convertSecondsToTimeStamp(modifiedDate),
    publishedDate: convertSecondsToTimeStamp(publishedDate),
    postDate: convertTimeStampToForm(postDate),
    isDraft,
    isPublished,
    isScheduled,
    isUnpublished,
  } as ArticleForm;
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
