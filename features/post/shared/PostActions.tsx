import { useRouter } from 'next/router';
import { FC } from 'react';

import IconButton from 'components/icon/IconButton';

type Props = {
  id: string;
  onActiveId(id: string): void;
  onDelete?(): void;
  onCancel?(): void;
  onUnpublish?(): void;
};

const PostActions: FC<Props> = ({
  id,
  onDelete,
  onActiveId,
  onCancel,
  onUnpublish,
}) => {
  const router = useRouter();
  const isDraft = router.pathname.includes('draft');
  const isPublished = router.pathname.includes('published');
  const isUnpublished = router.pathname.includes('unpublished');
  const isScheduled = router.pathname.includes('scheduled');

  return (
    <div className='flex gap-1 ml-4'>
      {/* {
        <IconLink
          icon='preview'
          tooltip='Preview Post'
          href={`${`/article/${id}/view`}`}
          target='_blank'
        />
      } */}
      {isPublished && !isUnpublished && (
        <IconButton
          icon='disabled_visible'
          tooltip='Unpublish Post'
          onClick={() => {
            onActiveId(id);

            if (onUnpublish) {
              onUnpublish();
            }
          }}
        />
      )}
      {isScheduled && (
        <IconButton
          icon='cancel_schedule_send'
          tooltip='Cancel Schedule Post'
          onClick={() => {
            onActiveId(id);

            if (onCancel) {
              onCancel();
            }
          }}
        />
      )}
      <IconButton
        icon='edit'
        tooltip='Edit Post'
        onClick={() =>
          router.push(
            {
              pathname: `/article/${id}/edit`,
              query: { id, isDraft, isPublished, isUnpublished, isScheduled },
            },
            `/article/${id}/edit`
          )
        }
      />
      {isDraft && (
        <IconButton
          icon='delete'
          tooltip='Delete Post'
          onClick={() => {
            onActiveId(id);

            if (onDelete) {
              onDelete();
            }
          }}
        />
      )}
    </div>
  );
};

export default PostActions;
