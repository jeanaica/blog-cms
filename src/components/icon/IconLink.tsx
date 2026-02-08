import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Loading from 'components/Loading';
import Icon from './Icon';

type Props = {
  href: string;
  icon: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  target?: string;
  tooltip?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconLink: FC<Props> = ({
  href,
  icon,
  className,
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
          className='px-2 py-1 text-3xl text-sky-700 rounded-md hover:bg-slate-100'
        />
      )}
    </Link>
  );
};

export default IconLink;
