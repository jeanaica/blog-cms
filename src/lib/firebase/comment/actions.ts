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
  await deleteDoc(doc(db, 'comment', id));
};

export const editComment = async ({
  id,
  postId,
  postTitle,
  comment,
}: Comment) => {
  const commentDocRef = doc(db, 'comment', id);
  const dateServer = serverTimestamp();
  await updateDoc(commentDocRef, {
    name: 'Jeanaica',
    postId,
    postTitle,
    comment,
    modifiedDate: dateServer,
    isUnread: false,
    isReply: true,
  });
};

export const replyComment = async ({
  postId,
  postTitle,
  comment,
  commentId,
}: {
  postId: string;
  postTitle: string;
  comment: string;
  commentId: string;
}) => {
  const newCommentDocRef = collection(db, 'comment');
  const commentDocRef = doc(db, 'comment', commentId);

  const dateServer = serverTimestamp();

  await addDoc(newCommentDocRef, {
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

  await updateDoc(commentDocRef, {
    publishedDate: dateServer,
    isUnread: false,
  });
};
