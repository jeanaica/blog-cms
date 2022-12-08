import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { db } from '../client';

export const deleteComment = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'comment', id));
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
