import { ButtonHTMLAttributes, FC, ReactNode, memo } from 'react';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';
import Icon from 'components/icon/Icon';

type Props = {
  onClick?(): void;
  primary?: boolean;
  // we want to limit the icons used to icons in repository only
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
      'flex items-center gap-2 rounded border duration-300 font-semibold justify-center px-4 py-2 h-[50px] flex-1',
      className,
      {
        'bg-slate-500 text-white': primary,
        'cursor-not-allowed opacity-50': disabled || isLoading,
        'hover:text-sky-700': primary && !disabled,
        'hover:bg-slate-300 hover:text-slate-800 focus:ring-4 focus:ring-slate-200':
          !disabled,
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
        className={`px-0 sm:px-2 py-1 text-2xl md:text-3xl rounded-md `}
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

export default memo(Button);
