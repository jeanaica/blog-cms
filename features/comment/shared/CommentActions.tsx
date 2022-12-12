import Button from 'components/icon/IconButton';
import { useRouter } from 'next/router';
import { FC } from 'react';

type Props = {
  id: string;
  postId: string;
  onActiveId(id: string, postId: string): void;
  onDelete?(modal: string): void;
  onReply?(modal: string): void;
  onEdit?(): void;
  onView?(modal: string): void;
};

const CommentActions: FC<Props> = ({
  id,
  postId,
  onDelete,
  onActiveId,
  onReply,
  onEdit,
  onView,
}) => {
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

          if (onView) {
            onView('view');
          }
        }}
      />
      {(isRead || isUnread) && (
        <Button
          icon='quickreply'
          tooltip='Reply to Comment'
          onClick={() => {
            onActiveId(id, postId);

            if (onReply) {
              onReply('reply');
            }
          }}
        />
      )}
      {isReply && (
        <Button
          icon='edit'
          tooltip='Edit Comment'
          onClick={() => {
            onActiveId(id, postId);

            if (onEdit) {
              onEdit();
            }
          }}
        />
      )}
      <Button
        icon='delete'
        tooltip='Delete Comment'
        onClick={() => {
          onActiveId(id, postId);

          if (onDelete) {
            onDelete('delete');
          }
        }}
      />
    </div>
  );
};

export default CommentActions;
