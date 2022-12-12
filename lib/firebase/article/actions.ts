import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { isToday } from 'lib/utils/dateHelpers';

import { db } from '../client';
import handleUpload from '../storage/upload';
import { Article, Tags } from './types';

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

export const saveDraftArticle = async (article: Article) => {
  try {
    const postDocRef = collection(db, 'post');
    const dateServer = serverTimestamp();

    const uploadedBanner = await handleUpload({ file: article.banner }).then(
      async resp => await getDownloadURL(resp.ref)
    );

    await addTags(article.tags);

    await addDoc(postDocRef, {
      ...article,
      banner: uploadedBanner,
      createdDate: dateServer,
      modifiedDate: dateServer,
      postedDate: null,
      isDraft: true,
      isPublished: false,
      isScheduled: false,
    });
  } catch (error) {
    throw error;
  }
};

export const publishNewArticle = async (article: Article) => {
  try {
    const postDocRef = collection(db, 'post');
    const dateServer = serverTimestamp();
    const isPostedDateToday = isToday(article.postDate);
    const uploadedBanner = await handleUpload({ file: article.banner }).then(
      async resp => await getDownloadURL(resp.ref)
    );

    await addTags(article.tags);

    await addDoc(postDocRef, {
      ...article,
      banner: uploadedBanner,
      createdDate: dateServer,
      modifiedDate: dateServer,
      isDraft: false,
      isPublished: isPostedDateToday,
      isScheduled: !isPostedDateToday,
    });
  } catch (error) {
    throw error;
  }
};

export const updatePublishedArticle = async (article: Article) => {
  try {
    const postDocRef = doc(db, 'post', article.id);
    const dateServer = serverTimestamp();

    await addTags(article.tags);

    await updateDoc(postDocRef, {
      ...article,
      modifiedDate: dateServer,
      isDraft: false,
      isPublished: true,
      isScheduled: false,
    });
  } catch (error) {
    throw error;
  }
};

export const publishDraftArticle = async (article: Article) => {
  try {
    const postDocRef = doc(db, 'post', article.id);
    const dateServer = serverTimestamp();
    const isPostedDateToday = isToday(article.postDate);
    const uploadedBanner =
      typeof article.banner !== 'string'
        ? await handleUpload({ file: article.banner }).then(
            async resp => await getDownloadURL(resp.ref)
          )
        : article.banner;

    await addTags(article.tags);

    await updateDoc(postDocRef, {
      ...article,
      banner: uploadedBanner,
      createdDate: dateServer,
      modifiedDate: dateServer,
      isDraft: false,
      isPublished: isPostedDateToday,
      isScheduled: !isPostedDateToday,
    });
  } catch (error) {
    throw error;
  }
};
