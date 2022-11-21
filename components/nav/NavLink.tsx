import { FC } from 'react';

import classnames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  href: string;
  icon: string;
  className?: string;
  text: string;
};

const NavLink: FC<Props> = ({ href, icon, className, text }) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      className={classnames('flex w-full items-center px-8 py-4', {
        'bg-secondary-100 text-white': router.pathname === href,
      })}>
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
