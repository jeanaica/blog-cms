import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';
import Icon from './Icon';

type Props = {
  onClick?(): void;
  icon: string;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
  tooltip?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: FC<Props> = ({
  onClick,
  icon,
  className,
  iconClassName,
  disabled,
  isLoading,
  tooltip,
}) => (
  <button
    type='button'
    title={tooltip}
    className={classNames(
      'px-2 py-1 rounded-md flex items-center hover:bg-slate-100 hover:shadow-md',
      className,
      {
        'cursor-not-allowed opacity-50': disabled || isLoading,
      }
    )}
    onClick={onClick}
    disabled={disabled}>
    {isLoading && <Loading />}
    <Icon
      icon={icon}
      className={classNames('text-3xl text-sky-700', iconClassName)}
    />
  </button>
);

export default IconButton;
