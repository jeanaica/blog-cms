import { QueryDocumentSnapshot } from 'firebase/firestore';
import { Comment, CommentAPI } from 'lib/firebase/comment/types';

import { convertSecondsToTimeStamp } from './dateConverter';

export function mapComments(
  comments: QueryDocumentSnapshot<CommentAPI>
): Comment {
  const id: any = comments.id;
  const commentData = comments.data();

  const modifiedDate = convertSecondsToTimeStamp(commentData.modifiedDate);
  const publishedDate = convertSecondsToTimeStamp(commentData.publishedDate);
  const postedDate = convertSecondsToTimeStamp(commentData.postedDate);

  return {
    ...commentData,
    id,
    publishedDate,
    modifiedDate,
    postedDate,
  };
}
