import { type FC, type MouseEventHandler, useCallback, useState } from 'react';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';

import { type Thought } from '../types';
import Actions from './Actions';

type Props = {
  thought: Thought;
  onEdit: () => void;
  onDelete: () => void;
  onStatusUpdate: (id: string, status: string) => void;
  loading?: boolean;
};

const statusColors: Record<string, string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-100 text-blue-800',
};

const ThoughtCard: FC<Props> = ({ thought, onEdit, onDelete, onStatusUpdate, loading = false }) => {
  const [showActions, setShowActions] = useState<string>();
  const status = thought.status.toLowerCase();

  const formattedDate = thought.createdAt
    ? new Date(thought.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  const isMobile = () => window.innerWidth < 768;

  const handleHover: MouseEventHandler = e => {
    if (isMobile()) return;
    e.stopPropagation();
    setShowActions(thought.id);
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
      setShowActions(thought.id);
    }
  };

  const handlePublish: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      onStatusUpdate(thought.id, 'published');
    },
    [thought.id, onStatusUpdate]
  );

  const handleMoveToDraft: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      onStatusUpdate(thought.id, 'draft');
    },
    [thought.id, onStatusUpdate]
  );

  const handleDelete: MouseEventHandler = useCallback(
    e => {
      e.stopPropagation();
      onDelete();
    },
    [onDelete]
  );

  const handleThoughtClick: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    e.preventDefault();
    if (!loading) {
      onEdit();
    }
  };

  return (
    <div
      role='button'
      onClick={handleThoughtClick}
      title='Edit thought'
      className={classNames(
        'flex overflow-visible relative border border-slate-300 p-4 my-4 bg-white hover:drop-shadow-md rounded',
        {
          'cursor-not-allowed': loading,
          'border-l-4 border-l-amber-400': thought.isQuote,
        }
      )}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeaveHover}>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mb-2'>
          <span
            className={classNames(
              'text-xs font-semibold px-2 py-0.5 rounded-full capitalize',
              statusColors[thought.status] || 'bg-gray-100 text-gray-800'
            )}>
            {thought.status}
          </span>
          {thought.isQuote && (
            <span className='text-xs text-amber-600 font-medium flex items-center gap-1'>
              <Icon icon='format_quote' size='sm' />
              Quote
            </span>
          )}
          <span className='text-xs text-gray-400'>{formattedDate}</span>
        </div>
        <p className='text-sm text-gray-700 line-clamp-3'>
          {thought.isQuote && '"'}
          {thought.text}
          {thought.isQuote && '"'}
        </p>
        {thought.tags && thought.tags.length > 0 && (
          <div className='flex gap-1 mt-2 flex-wrap'>
            {thought.tags.map(tag => (
              <span
                key={tag}
                className='text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <Actions
        id={thought.id}
        status={status}
        onPublish={handlePublish}
        onMoveToDrafts={handleMoveToDraft}
        onDelete={handleDelete}
        onMore={handleClickMore}
        loading={loading}
        show={thought.id === showActions}
      />
    </div>
  );
};

export default ThoughtCard;
