import { ArticleForm } from 'features/article/shared/types';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';

import { isToday } from 'lib/utils/dateHelpers';

import { db } from '../client';
import handleUpload from '../storage/upload';
import { ArticleTypes, Tags } from './types';

export const addTags = async (tags: Tags) => {
  try {
    try {
      const postDocRef = doc(db, 'post', 'list');

      await updateDoc(postDocRef, {
        tags: arrayUnion(...tags),
      });
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

export const saveArticle = async ({
  article,
  type,
}: {
  article: ArticleForm;
  type: ArticleTypes;
}) => {
  try {
    const postDocRef = collection(db, 'post');
    const dateServer = serverTimestamp();
    const isPostedDateToday = article.postDate && isToday(article.postDate);
    const uploadedBanner =
      typeof article.banner !== 'string'
        ? await handleUpload({ file: article.banner }).then(
            async resp => await getDownloadURL(resp.ref)
          )
        : article.banner;

    await addTags(article.tags);

    await addDoc(postDocRef, {
      title: article.title,
      banner: uploadedBanner,
      content: article.content,
      category: article.category,
      tags: article.tags,
      createdDate: dateServer,
      postDate: isPostedDateToday
        ? null
        : article.postDate && Timestamp.fromDate(new Date(article.postDate)),
      modifiedDate: dateServer,
      isDraft: type === 'isDraft',
      isPublished: type === 'isPublished',
      isScheduled: type === 'isScheduled',
      publishedDate: type === 'isPublished' ? dateServer : null,
      meta: {
        slug: article.slug,
        author: article.author,
        image: uploadedBanner,
        description: article.description,
        title: article.title,
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/${article.slug}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateArticle = async ({
  article,
  id,
  type,
}: {
  article: ArticleForm;
  id: string;
  type?: ArticleTypes;
}) => {
  try {
    const isDraft = type === ArticleTypes.isDraft;
    const isPublished = type === ArticleTypes.isPublished;
    const isUnpublished = type === ArticleTypes.isUnpublished;
    const isScheduled = type === ArticleTypes.isScheduled;

    const postDocRef = doc(db, 'post', id);
    const dateServer = serverTimestamp();
    const uploadedBanner =
      typeof article.banner !== 'string'
        ? await handleUpload({ file: article.banner }).then(
            async resp => await getDownloadURL(resp.ref)
          )
        : article.banner;
    const postDate =
      isDraft || isPublished || isUnpublished || !article.postDate
        ? null
        : Timestamp.fromDate(new Date(article.postDate));

    await addTags(article.tags);

    await updateDoc(postDocRef, {
      title: article.title,
      banner: uploadedBanner,
      content: article.content,
      category: article.category,
      tags: article.tags,
      createdDate: dateServer,
      modifiedDate: dateServer,
      postDate,
      isDraft: isDraft,
      isPublished: isPublished,
      isScheduled: isScheduled,
      publishedDate:
        !isDraft || !isPublished || !isScheduled
          ? dateServer
          : article.publishedDate,
      meta: {
        slug: article.slug,
        author: article.author,
        image: uploadedBanner,
        description: article.description,
        title: article.title,
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/${article.slug}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
