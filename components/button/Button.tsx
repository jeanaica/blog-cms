import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';
import Icon from 'components/icon/Icon';

type Props = {
  onClick?(): void;
  primary?: boolean;
  icon?: string;
  children?: ReactNode;
  text?: string;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({
  onClick,
  type = 'button',
  primary,
  icon,
  text,
  children,
  className,
  disabled,
  isLoading,
}) => {
  return (
    <button
      type={type}
      className={classNames(
        'flex items-center rounded border duration-300 font-semibold justify-center px-4 py-2 hover:bg-slate-300 hover:text-slate-800 focus:ring-4 focus:ring-slate-200 h-[50px]',
        className,
        {
          'bg-slate-500 text-white text-xl': primary,
          'cursor-not-allowed opacity-50': disabled || isLoading,
        }
      )}
      onClick={onClick}
      disabled={disabled}>
      {isLoading && <Loading />}
      {icon && (
        <Icon
          icon={icon}
          className='px-0 sm:px-2 py-1 text-xl md:text-3xl text-sky-700 rounded-md'
        />
      )}
      {children && !text && children}
      {!children && text && (
        <span
          className={classNames('font-semibold md:flex', {
            hidden: icon || (icon && !primary),
          })}>
          {text}
        </span>
      )}
    </button>
  );
};

export default Button;
