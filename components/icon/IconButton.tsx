import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';
import Icon from './Icon';

type Props = {
  onClick?(): void;
  icon: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: FC<Props> = ({
  onClick,
  icon,
  className,
  disabled,
  isLoading,
}) => (
  <button
    type='button'
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
      className='text-3xl text-sky-700'
    />
  </button>
);

export default IconButton;
