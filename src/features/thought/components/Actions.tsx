import { FC, MouseEventHandler } from 'react';

import IconButton from 'components/icon/IconButton';
import classNames from 'classnames';

type Props = {
  id: string;
  onPublish: MouseEventHandler;
  onMoveToDrafts: MouseEventHandler;
  onDelete: MouseEventHandler;
  onMore: MouseEventHandler;
  status: string;
  loading: boolean;
  show: boolean;
};

const Actions: FC<Props> = ({
  onPublish,
  onMoveToDrafts,
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
      <IconButton
        icon='publish'
        tooltip='Publish'
        size='2xl'
        disabled={loading || status === 'published'}
        onClick={onPublish}
      />
      <IconButton
        icon='move_to_inbox'
        tooltip='Move to drafts'
        size='2xl'
        disabled={loading || status === 'draft'}
        onClick={onMoveToDrafts}
      />
      <IconButton
        icon='delete'
        tooltip='Delete Thought'
        size='2xl'
        disabled={loading}
        onClick={onDelete}
      />
    </div>
  </div>
);

export default Actions;
