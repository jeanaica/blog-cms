import { FC } from 'react';

import IconButton from 'components/icon/IconButton';
import IconLink from 'components/icon/IconLink';

type Props = {
  id: string;
  onMoveToDrafts(): void;
  onDelete(): void;
  status: string;
  loading: boolean;
};

const Actions: FC<Props> = ({
  id,
  onDelete,
  onMoveToDrafts,
  status,
  loading,
}) => (
  <div className='flex gap-1 ml-4'>
    <IconLink
      icon='remove_red_eye'
      tooltip='Preview Article'
      href={`${`/article/${id}/view`}`}
      target='_blank'
      isLoading={loading}
      className='mr-2'
    />
    {status !== 'draft' && (
      <IconButton
        className='mr-2'
        icon='send_and_archive'
        tooltip='Move to drafts'
        isLoading={loading}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onMoveToDrafts();
        }}
      />
    )}
    {status === 'draft' && (
      <IconButton
        className='mr-2'
        icon='delete'
        tooltip='Delete Post'
        isLoading={loading}
        onClick={e => {
          e.stopPropagation();
          onDelete();
        }}
      />
    )}
  </div>
);

export default Actions;
