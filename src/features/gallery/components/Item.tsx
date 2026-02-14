import { type FC, type MouseEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Gallery } from '../types/Gallery';

import Content from './Content';
import Actions from './Actions';

type Props = {
  id: string;
  gallery: Gallery;
  onUpdate(id: string, status: string): Promise<void>;
  onDelete(id: string): Promise<void>;
  loading: boolean;
};

const Item: FC<Props> = ({ id, gallery, onUpdate, onDelete, loading }) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState<string>();
  const status = gallery.status.toLowerCase();

  const handleGalleryClick: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    e.preventDefault();
    if (!loading) {
      navigate(`/gallery/${id}/edit`);
    }
  };

  const isMobile = () => window.innerWidth < 768;

  const handleHover: MouseEventHandler = e => {
    if (isMobile()) return;
    e.stopPropagation();
    setShowActions(id);
  };

  const handleLeaveHover: MouseEventHandler = e => {
    if (isMobile()) return;
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

  const handlePublish: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      onUpdate(id, 'PUBLISHED');
    },
    [id, onUpdate]
  );

  const handleArchive: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      onUpdate(id, 'ARCHIVED');
    },
    [id, onUpdate]
  );

  const handleDelete: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      onDelete(id);
    },
    [id, onDelete]
  );

  return (
    <div
      key={id}
      role='button'
      onClick={handleGalleryClick}
      title='Edit gallery'
      className={classNames(
        'flex overflow-visible relative border border-slate-300 p-4 my-4 bg-white hover:drop-shadow-md rounded',
        {
          'cursor-not-allowed': loading,
          'bg-gray-200': status === 'archived',
        }
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeaveHover}>
      <Content
        title={gallery.title}
        description={gallery.description}
        imageCount={gallery.images?.length || 0}
        updatedAt={gallery.updatedAt}
        publishedAt={gallery.publishedAt}
        scheduledAt={gallery.scheduledAt}
        status={gallery.status}
        images={gallery.images || []}
      />

      <Actions
        id={gallery.id}
        status={status}
        onPublish={handlePublish}
        onMoveToDrafts={handleMoveToDraft}
        onArchive={handleArchive}
        onDelete={handleDelete}
        onMore={handleClickMore}
        loading={loading}
        show={id === showActions}
      />
    </div>
  );
};

export default Item;
