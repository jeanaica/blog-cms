import { type FC, type ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

import { type DragHandleProps } from './BlockHeader';

type Props = {
  id: string;
  index: number;
  activeIndex: number | null;
  children: (dragHandleProps: DragHandleProps) => ReactNode;
};

const SortableBlock: FC<Props> = ({ id, index, activeIndex, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const showTopIndicator =
    isOver && !isDragging && activeIndex !== null && activeIndex > index;
  const showBottomIndicator =
    isOver && !isDragging && activeIndex !== null && activeIndex < index;

  return (
    <>
      {showTopIndicator && (
        <div className='h-2 bg-gray-200 rounded' />
      )}
      <div
        ref={setNodeRef}
        style={style}
        className={classNames(
          'rounded border border-gray-200 overflow-hidden',
          { 'opacity-50': isDragging }
        )}>
        {children({
          dragHandleListeners: listeners,
          dragHandleAttributes: attributes,
        })}
      </div>
      {showBottomIndicator && (
        <div className='h-2 bg-gray-200 rounded' />
      )}
    </>
  );
};

export default SortableBlock;
