import { FC, MouseEventHandler } from 'react';

import IconButton from 'components/icon/IconButton';
import IconLink from 'components/icon/IconLink';
import classNames from 'classnames';

type Props = {
  id: string;
  onPublish: MouseEventHandler;
  onMoveToDrafts: MouseEventHandler;
  onArchive: MouseEventHandler;
  onDelete: MouseEventHandler;
  onMore: MouseEventHandler;
  status: string;
  loading: boolean;
  show: boolean;
};

const Actions: FC<Props> = ({
  id,
  onPublish,
  onMoveToDrafts,
  onArchive,
  onDelete,
  onMore,
  status,
  loading,
  show,
}) => (
  <div className='self-center md:self-stretch flex items-center relative'>
    <IconButton
      icon='more_vert'
      onClick={onMore}
      className='md:hidden'
    />
    <div
      className={classNames(
        'p-2 gap-1 flex-row absolute right-0 bottom-[calc(100%-0.25rem)] z-30 shadow-lg rounded-lg border border-slate-200 bg-white md:shadow-none md:border-0 md:p-1 md:bottom-auto md:top-0 md:flex-row md:items-center',
        {
          hidden: !show,
          flex: show,
        }
      )}>
      <IconLink
        icon='remove_red_eye'
        size='2xl'
        tooltip='Preview Article'
        href={`/article/${id}/view`}
        target='_blank'
        disabled={loading}
        className='md:border-0'>
        <span>Preview</span>
      </IconLink>
      <IconButton
        icon='publish'
        tooltip='Publish'
        size='2xl'
        disabled={loading || status === 'published'}
        onClick={onPublish}
      />
      <IconButton
        icon='send_and_archive'
        tooltip='Move to drafts'
        size='2xl'
        disabled={loading || status === 'draft'}
        onClick={onMoveToDrafts}
      />
      <IconButton
        icon='archive'
        tooltip='Archive'
        size='2xl'
        disabled={loading || status === 'archived'}
        onClick={onArchive}
      />
      <IconButton
        icon='delete'
        tooltip='Delete Post'
        size='2xl'
        disabled={loading || status !== 'draft'}
        onClick={onDelete}
      />
    </div>
  </div>
);

export default Actions;
