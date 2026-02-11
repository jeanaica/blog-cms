import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';

import Icon from './Icon';

type Props = {
  onClick?: MouseEventHandler;
  // we want to limit the icons used to icons in repository only
  icon: string;
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
  className,
  iconClassName,
  disabled,
  isLoading,
  tooltip,
}) => (
  <button
    type={type}
    title={tooltip}
    className={classNames('flex items-center cursor-pointer', className, {
      'cursor-not-allowed opacity-50': disabled || isLoading,
    })}
    onClick={onClick}
    disabled={disabled || isLoading}>
    {isLoading && <Loading className='w-[44px]' />}
    {!isLoading && (
      <Icon
        icon={icon}
        className={classNames(
          'px-2 py-1 text-3xl text-sky-700 rounded-md hover:bg-slate-100',
          iconClassName
        )}
      />
    )}
  </button>
);

export default IconButton;
