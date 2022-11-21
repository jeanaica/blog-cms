import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';

type Props = {
  onClick?(): void;
  outlined?: boolean;
  icon?: boolean;
  children?: ReactNode;
  large?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({
  onClick,
  type = 'button',
  outlined,
  icon,
  large,
  children,
  className,
  disabled,
  isLoading,
}) => {
  return (
    <button
      type={type}
      className={classNames(
        'flex items-center rounded duration-300 font-semibold justify-center',
        className,
        {
          'px-8 py-2 text-xl bg-primary-500 text-primary-100 hover:bg-primary-600':
            !outlined,
          'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-primary-100':
            outlined || icon,
          'px-2 py-1 text-sm': !large,
          'px-4 py-2 text-sm': large,
          'cursor-not-allowed opacity-50': disabled || isLoading,
          'border-0 bg-transparent': icon,
        }
      )}
      onClick={onClick}
      disabled={disabled}>
      {isLoading && <Loading />}
      {children}
    </button>
  );
};

export default Button;
