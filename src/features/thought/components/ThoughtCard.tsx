import { type FC } from 'react';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';
import IconButton from 'components/icon/IconButton';

import { type Thought } from '../types';

type Props = {
  thought: Thought;
  onEdit: () => void;
  onDelete: () => void;
  onStatusUpdate: (id: string, status: string) => void;
};

const statusColors: Record<string, string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  scheduled: 'bg-blue-100 text-blue-800',
};

const ThoughtCard: FC<Props> = ({ thought, onEdit, onDelete, onStatusUpdate }) => {
  const formattedDate = thought.createdAt
    ? new Date(thought.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div
      className={classNames(
        'border rounded-lg p-4 bg-white hover:shadow-md transition-shadow cursor-pointer',
        { 'border-l-4 border-l-amber-400': thought.isQuote }
      )}
      onClick={onEdit}>
      <div className='flex justify-between items-start gap-4'>
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
        <div className='flex gap-1' onClick={e => e.stopPropagation()}>
          {thought.status === 'draft' && (
            <IconButton
              icon='publish'
              size='xl'
              tooltip='Publish'
              onClick={() => onStatusUpdate(thought.id, 'published')}
            />
          )}
          {thought.status === 'published' && (
            <IconButton
              icon='unpublished'
              size='xl'
              tooltip='Move to Draft'
              onClick={() => onStatusUpdate(thought.id, 'draft')}
            />
          )}
          <IconButton
            icon='edit'
            size='xl'
            tooltip='Edit'
            onClick={onEdit}
          />
          <IconButton
            icon='delete'
            size='xl'
            tooltip='Delete'
            className='text-red-500 hover:text-red-700'
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ThoughtCard;
