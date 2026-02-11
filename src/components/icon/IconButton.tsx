import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';

import Icon, { type IconSize } from './Icon';

type Props = {
  onClick?: MouseEventHandler;
  // we want to limit the icons used to icons in repository only
  icon: string;
  size?: IconSize;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
  tooltip?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: FC<Props> = ({
  onClick,
  type = 'button',
  icon,
  size,
  className,
  iconClassName,
  disabled,
  isLoading,
  tooltip,
}) => {
  return (
    <div className={classNames(className)}>
      <button
        type={type}
        title={tooltip}
        className={classNames('flex items-center', {
          'cursor-not-allowed opacity-50': disabled || isLoading,
          'cursor-pointer': !disabled && !isLoading,
        })}
        onClick={onClick}
        disabled={disabled || isLoading}>
        {isLoading && <Loading className='w-[44px]' />}
        {!isLoading && (
          <Icon
            icon={icon}
            size={size}
            className={classNames(
              'px-2 py-1 text-sky-700 rounded-md hover:bg-slate-100',
              iconClassName
            )}
          />
        )}
      </button>
    </div>
  );
};

export default IconButton;
