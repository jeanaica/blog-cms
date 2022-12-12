import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { db } from '../client';
import { Comment } from './types';

export const deleteComment = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'comment', id));
  } catch (error) {
    throw error;
  }
};

export const editComment = async ({
  id,
  postId,
  postTitle,
  comment,
}: Comment) => {
  try {
    const postDocRef = doc(db, 'comment', id);
    const dateServer = serverTimestamp();
    await updateDoc(postDocRef, {
      name: 'Jeanaica',
      postId,
      postTitle,
      comment,
      modifiedDate: dateServer,
      isUnread: false,
      isReply: true,
    });
  } catch (error) {
    throw error;
  }
};

export const replyComment = async ({
  postId,
  postTitle,
  comment,
}: {
  postId: string;
  postTitle: string;
  comment: string;
}) => {
  try {
    const commentDocRef = collection(db, 'comment');
    const dateServer = serverTimestamp();
    await addDoc(commentDocRef, {
      name: 'Jeanaica',
      postId,
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
