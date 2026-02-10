import { FC } from 'react';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';
import IconButton from 'components/icon/IconButton';

import { BlockType, BLOCK_TYPE_META } from './types';

type Props = {
  type: BlockType;
  onRemove: () => void;
  className?: string;
};

const BlockHeader: FC<Props> = ({ type, onRemove, className }) => {
  const { label, icon } = BLOCK_TYPE_META[type];

  return (
    <div
      className={classNames(
        'flex items-center justify-between px-3 py-2 bg-slate-100 border-b border-gray-200',
        className
      )}>
      <div className='flex items-center gap-2'>
        <Icon
          icon='drag_indicator'
          className='text-gray-300 cursor-not-allowed'
          size='base'
        />
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
