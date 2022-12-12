import { useRouter } from 'next/router';
import { FC } from 'react';

import Button from 'components/icon/IconButton';

type Props = {
  id: string;
  postId: string;
  onActiveId(id: string, postId: string): void;

  onEdit?(): void;
  onModalShow(modal: string): void;
};

const CommentActions: FC<Props> = ({ id, postId, onActiveId, onModalShow }) => {
  const router = useRouter();
  const isRead = router.pathname.includes('read');
  const isUnread = router.pathname.includes('unread');
  const isReply = router.pathname.includes('replies');

  return (
    <div className='flex gap-1 ml-4'>
      <Button
        icon='forum'
        tooltip='View Comment/Thread'
        onClick={() => {
          onActiveId(id, postId);

          onModalShow('view');
        }}
      />
      {isUnread && (
        <Button
          icon='quickreply'
          tooltip='Reply to Comment'
          onClick={() => {
            onActiveId(id, postId);

            onModalShow('reply');
          }}
        />
      )}
      {isReply && (
        <Button
          icon='edit'
          tooltip='Edit Comment'
          onClick={() => {
            onActiveId(id, postId);

            onModalShow('reply');
          }}
        />
      )}
      <Button
        icon='delete'
        tooltip='Delete Comment'
        onClick={() => {
          onActiveId(id, postId);

          onModalShow('delete');
        }}
      />
    </div>
  );
};

export default CommentActions;
