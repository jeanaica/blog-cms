import { type FC, memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';

type Props = {
  id: string;
  preview: string;
  onRemove: () => void;
  disabled?: boolean;
  caption?: string;
  alt?: string;
  onCaptionChange?: (caption: string) => void;
  onAltChange?: (alt: string) => void;
};

const SortableImageCard: FC<Props> = ({
  id,
  preview,
  onRemove,
  disabled,
  caption,
  alt,
  onCaptionChange,
  onAltChange,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasMetadata = !!onCaptionChange;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(
        'relative rounded overflow-hidden border border-gray-200 group',
        {
          'aspect-square': !hasMetadata,
          'opacity-50': isDragging,
        }
      )}>
      <div
        className={classNames('relative', {
          'h-full': !hasMetadata,
          'aspect-square': hasMetadata,
        })}>
        <img
          src={preview}
          alt=''
          className='w-full h-full object-cover'
        />

        {!disabled && (
          <>
            <button
              type='button'
              className='absolute top-1 left-1 p-1 rounded bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing'
              {...attributes}
              {...listeners}>
              <Icon
                icon='drag_indicator'
                size='sm'
              />
            </button>

            <button
              type='button'
              className='absolute top-1 right-1 p-1 rounded bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity'
              onClick={onRemove}>
              <Icon
                icon='close'
                size='sm'
              />
            </button>
          </>
        )}
      </div>

      {hasMetadata && (
        <div className='p-2 space-y-1'>
          <input
            type='text'
            placeholder='Caption'
            value={caption ?? ''}
            onChange={e => onCaptionChange(e.target.value)}
            className='border-b-secondary-300 border-b w-full px-2 py-1 text-xs outline-none focus:ring-0 focus:text-black'
            disabled={disabled}
          />
          <input
            type='text'
            placeholder='Alt text'
            value={alt ?? ''}
            onChange={e => onAltChange?.(e.target.value)}
            className='border-b-secondary-300 border-b w-full px-2 py-1 text-xs outline-none focus:ring-0 focus:text-black'
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default memo(SortableImageCard);
