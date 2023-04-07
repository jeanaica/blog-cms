import { FC } from 'react';

import IconButton from 'components/icon/IconButton';
import IconLink from 'components/icon/IconLink';

type Props = {
  id: string;
  onMoveToDrafts(): void;
  onDelete(): void;
  status: string;
};

const PostActions: FC<Props> = ({ id, onDelete, onMoveToDrafts, status }) => {
  return (
    <div className='flex gap-1 ml-4'>
      <IconLink
        icon='remove_red_eye'
        tooltip='Preview Article'
        href={`${`/article/${id}/view`}`}
        target='_blank'
      />
      {status !== 'draft' && (
        <IconButton
          icon='send_and_archive'
          tooltip='Move to drafts'
          onClick={e => {
            e.stopPropagation();
            onMoveToDrafts();
          }}
        />
      )}
      {status === 'draft' && (
        <IconButton
          icon='delete'
          tooltip='Delete Post'
          onClick={e => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}
    </div>
  );
};

export default PostActions;
