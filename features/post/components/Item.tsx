import React, { FC, MouseEventHandler, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Article } from 'shared/types/Article';

import Content from './Content';
import Actions from './Actions';

type Props = {
  id: string;
  post: Article;
  onUpdate(id: string, status: string): Promise<void>;
  loading: boolean;
};

const Item: FC<Props> = ({ id, post, onUpdate, loading }) => {
  const router = useRouter();
  const [showActions, setShowActions] = useState<string>();

  const handlePostClick: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    e.preventDefault();
    if (!loading) {
      router.push(`/article/${id}/edit`);
    }
  };

  const handleHover = () => setShowActions(id);

  const handleLeaveHover = () => setShowActions('');

  const handleMoveToDraft = useCallback(
    () => onUpdate(id, 'DRAFT'),
    [id, onUpdate]
  );

  const handleDelete = useCallback(
    () => onUpdate(id, 'ARCHIVED'),
    [id, onUpdate]
  );

  return (
    <div
      key={id}
      role='button'
      onClick={handlePostClick}
      title='Edit post'
      className={classNames(
        'flex border border-slate-300 p-4 my-4 bg-white hover:drop-shadow-md rounded',
        {
          'cursor-not-allowed': loading,
        }
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeaveHover}>
      <Content {...post} />
      {id === showActions && (
        <Actions
          id={post.id}
          status={post.status.toLowerCase()}
          onMoveToDrafts={handleMoveToDraft}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Item;
