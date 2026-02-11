import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Loading from 'components/loading/Loading';
import Icon, { type IconSize } from './Icon';

type Props = {
  href: string;
  icon: string;
  size?: IconSize;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
  target?: string;
  tooltip?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconLink: FC<Props> = ({
  href,
  icon,
  size,
  className,
  iconClassName,
  disabled,
  isLoading,
  target,
  tooltip,
}) => {
  const handleClick: MouseEventHandler = e => e.stopPropagation();
  return (
    <Link
      className={classNames('no-underline flex items-center', className, {
        'cursor-not-allowed opacity-50': disabled || isLoading,
      })}
      onClick={handleClick}
      to={href}
      target={target}
      title={tooltip}>
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
    </Link>
  );
};

export default IconLink;
