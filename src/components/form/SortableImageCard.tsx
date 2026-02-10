import { type FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

type Props = {
  id: string;
  preview: string;
  onRemove: () => void;
  disabled?: boolean;
};

const SortableImageCard: FC<Props> = ({ id, preview, onRemove, disabled }) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(
        'relative aspect-square rounded overflow-hidden border border-gray-200 group',
        { 'opacity-50': isDragging }
      )}>
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
            <span className='material-icons-outlined text-sm'>
              drag_indicator
            </span>
          </button>

          <button
            type='button'
            className='absolute top-1 right-1 p-1 rounded bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity'
            onClick={onRemove}>
            <span className='material-icons-outlined text-sm'>close</span>
          </button>
        </>
      )}
    </div>
  );
};

export default SortableImageCard;
