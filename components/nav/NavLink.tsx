import { FC } from 'react';

import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  href: string;
  icon: string;
  className?: string;
  text: string;
  isAction?: boolean;
};

const NavLink: FC<Props> = ({
  href,
  icon,
  className,
  text,
  isAction = false,
}) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={classnames(
        'flex w-full items-center px-8 py-4 hover:bg-gray-300',
        {
          'bg-gray-200': router.pathname === href,
          'border-y': isAction,
        }
      )}>
      <span
        className={classnames(
          'material-icons-outlined text-xl mr-4',
          className
        )}>
        {icon}
      </span>
      {text}
    </Link>
  );
};

export default NavLink;
