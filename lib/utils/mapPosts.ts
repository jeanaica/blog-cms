import { QueryDocumentSnapshot } from 'firebase/firestore';

import { Post, PostAPI } from 'lib/firebase/post/types';

import {
  convertSecondsToTimeStamp,
  convertTimeStampToDate,
} from './dateConverter';

export function mapPosts(posts: QueryDocumentSnapshot<PostAPI>): Post {
  const id: any = posts.id;
  const postData = posts.data();

  const modifiedDate = convertSecondsToTimeStamp(postData.modifiedDate);
  const publishedDate = convertSecondsToTimeStamp(postData.publishedDate);
  const postDate = convertTimeStampToDate(postData.postDate);
  const createdDate = convertTimeStampToDate(postData.createdDate);

  return {
    ...postData,
    id,
    publishedDate,
    modifiedDate,
    postDate,
    createdDate,
  };
}
