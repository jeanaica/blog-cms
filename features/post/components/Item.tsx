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

  const handleHover: MouseEventHandler = e => {
    e.stopPropagation();
    setShowActions(id);
  };

  const handleLeaveHover: MouseEventHandler = e => {
    e.stopPropagation();
    setShowActions('');
  };

  const handleClickMore: MouseEventHandler = e => {
    e.stopPropagation();

    if (showActions) {
      setShowActions('');
    } else {
      setShowActions(id);
    }
  };

  const handleMoveToDraft: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      onUpdate(id, 'DRAFT');
    },
    [id, onUpdate]
  );

  const handleDelete: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      onUpdate(id, 'ARCHIVED');
    },
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

      <Actions
        id={post.id}
        status={post.status.toLowerCase()}
        onMoveToDrafts={handleMoveToDraft}
        onDelete={handleDelete}
        onMore={handleClickMore}
        loading={loading}
        show={id === showActions}
      />
    </div>
  );
};

export default Item;
