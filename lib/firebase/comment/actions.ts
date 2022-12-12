import { deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import { db } from '../client';
import { Comment } from './types';

export const deleteComment = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'comment', id));
  } catch (error) {
    throw error;
  }
};

export const replyComment = async ({ postId, postTitle, comment }: Comment) => {
  try {
    const postDocRef = doc(db, 'comment', postId);
    const dateServer = serverTimestamp();
    await updateDoc(postDocRef, {
      name: 'Jeanaica Suplido',
      postTitle,
      comment,
      modifiedDate: dateServer,
      publishedDate: dateServer,
      postedDate: dateServer,
      isUnread: false,
      isReply: true,
    });
  } catch (error) {
    throw error;
  }
};

export const unschedulePost = async (id: string) => {
  try {
    const postDocRef = doc(db, 'post', id);

    await updateDoc(postDocRef, {
      isScheduled: false,
      postDate: null,
    });
  } catch (error) {
    throw error;
  }
};

export const unpublishPost = async (id: string) => {
  try {
    const postDocRef = doc(db, 'post', id);

    await updateDoc(postDocRef, {
      isPublished: false,
    });
  } catch (error) {
    throw error;
  }
};
