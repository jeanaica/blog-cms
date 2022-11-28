import { useRouter } from 'next/router';
import { FC } from 'react';

import IconButton from 'components/icon/IconButton';
import IconLink from 'components/icon/IconLink';

const PostActions: FC = () => {
  const router = useRouter();
  const id = 'asdwdasdas';
  const isDraft = router.pathname.includes('draft');
  const isPublished = router.pathname.includes('published');
  const isUnpublished = router.pathname.includes('unpublished');
  const isScheduled = router.pathname.includes('scheduled');

  return (
    <div className='flex gap-1 ml-4'>
      {
        <IconLink
          icon='preview'
          tooltip='Preview Post'
          href={`${`/article/${id}/view`}`}
          target='_blank'
        />
      }
      {isPublished && !isUnpublished && (
        <IconButton
          icon='disabled_visible'
          tooltip='Unpublish Post'
          onClick={() => {}}
        />
      )}
      {isUnpublished && (
        <IconButton
          icon='publish'
          tooltip='Publish Post'
          onClick={() => {}}
        />
      )}
      {isScheduled && (
        <IconButton
          icon='cancel_schedule_send'
          tooltip='Cancel Schedule Post'
          onClick={() => {}}
        />
      )}
      <IconButton
        icon='edit'
        tooltip='Edit Post'
        onClick={() => router.push(`/article/${id}/edit`)}
      />
      {(isDraft || isUnpublished) && (
        <IconButton
          icon='delete'
          tooltip='Delete Post'
        />
      )}
    </div>
  );
};

export default PostActions;
