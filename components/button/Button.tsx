import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames';

import Loading from 'components/Loading';
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
}) => (
  <button
    type={type}
    className={classNames(
      'flex items-center rounded border duration-300 font-semibold justify-center px-4 py-2 enabled:hover:bg-slate-300 enabled:hover:text-slate-800 enabled:focus:ring-4 enabled:focus:ring-slate-200 h-[50px] flex-1 disabled:cursor-not-allowed disabled:opacity-50',
      className,
      {
        'bg-slate-500 text-white enabled:hover:text-sky-700': primary,
      }
    )}
    onClick={onClick}
    disabled={disabled || isLoading}>
    {isLoading && (
      <div className='flex justify-center items-center mr-2'>
        <Loading />
      </div>
    )}
    {icon && (
      <Icon
        icon={icon}
        className={`px-0 sm:px-2 py-1 text-xl md:text-3xl rounded-md `}
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

export default Button;
