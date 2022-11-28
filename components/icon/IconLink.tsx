import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import Loading from 'components/loading/Loading';
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
}) => (
  <Link
    className={classNames(
      'px-2 py-1 no-underline rounded-md flex items-center hover:bg-slate-100 hover:shadow-md',
      className,
      {
        'cursor-not-allowed opacity-50': disabled || isLoading,
      }
    )}
    href={href}
    target={target}
    title={tooltip}>
    {isLoading && <Loading />}
    <Icon
      icon={icon}
      className='text-3xl text-sky-700'
    />
  </Link>
);

export default IconLink;
