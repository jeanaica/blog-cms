import { FC, MouseEventHandler } from 'react';

import IconButton from 'components/icon/IconButton';
import IconLink from 'components/icon/IconLink';
import classNames from 'classnames';

type Props = {
  id: string;
  onMoveToDrafts: MouseEventHandler;
  onDelete: MouseEventHandler;
  onMore: MouseEventHandler;
  status: string;
  loading: boolean;
  show: boolean;
};

const Actions: FC<Props> = ({
  id,
  onDelete,
  onMoveToDrafts,
  onMore,
  status,
  loading,
  show,
}) => (
  <div className={classNames('ml-4 flex-col md:flex relative')}>
    <IconButton
      icon='more_vert'
      onClick={onMore}
      className=' -mr-4 md:hidden'
    />
    <div
      className={classNames(
        'gap-1 absolute right-0 shadow-md rounded bg-transparent md:shadow-none md:relative md:justify-center md:flex-1 md:flex-row',
        {
          hidden: !show,
          flex: show,
        }
      )}>
      <IconLink
        icon='remove_red_eye'
        tooltip='Preview Article'
        href={`${`/article/${id}/view`}`}
        target='_blank'
        isLoading={loading}
        className='border-r md:border-0'>
        <span>Preview</span>
      </IconLink>
      {status !== 'draft' && (
        <IconButton
          className=''
          icon='send_and_archive'
          tooltip='Move to drafts'
          isLoading={loading}
          onClick={onMoveToDrafts}
        />
      )}
      {status === 'draft' && (
        <IconButton
          className=''
          icon='delete'
          tooltip='Delete Post'
          isLoading={loading}
          onClick={onDelete}
        />
      )}
    </div>
  </div>
);

export default Actions;
