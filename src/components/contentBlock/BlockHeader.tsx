import { type FC, type HTMLAttributes } from 'react';
import { type SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';
import IconButton from 'components/icon/IconButton';

import { type BlockType, BLOCK_TYPE_META } from './types';

export type DragHandleProps = {
  dragHandleListeners?: SyntheticListenerMap;
  dragHandleAttributes?: HTMLAttributes<HTMLElement>;
};

type Props = DragHandleProps & {
  type: BlockType;
  onRemove: () => void;
  className?: string;
};

const BlockHeader: FC<Props> = ({
  type,
  onRemove,
  className,
  dragHandleListeners,
  dragHandleAttributes,
}) => {
  const { label, icon } = BLOCK_TYPE_META[type];

  return (
    <div
      className={classNames(
        'flex items-center justify-between px-3 py-2 bg-slate-100 border-b border-gray-200',
        className
      )}>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          className={classNames(
            'p-0 border-0 bg-transparent',
            dragHandleListeners
              ? 'text-gray-400 cursor-grab active:cursor-grabbing'
              : 'text-gray-300 cursor-not-allowed'
          )}
          {...dragHandleAttributes}
          {...dragHandleListeners}>
          <Icon
            icon='drag_indicator'
            size='base'
          />
        </button>
        <Icon
          icon={icon}
          size='sm'
        />
        <span className='text-sm font-semibold text-primary'>{label}</span>
      </div>
      <IconButton
        icon='delete'
        tooltip='Remove block'
        iconClassName='text-xl text-error-300 hover:text-error'
        onClick={onRemove}
      />
    </div>
  );
};

export default BlockHeader;
