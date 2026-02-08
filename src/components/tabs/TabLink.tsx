import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';

type Props = {
  className?: string;
  disabled?: boolean;
  text: string;
  href?: string;
  icon?: string;
  indexHref?: string;
};

const TabLink: FC<Props> = ({
  className,
  text,
  disabled = false,
  icon,
  href = '',
  indexHref = '/',
}) => {
  const location = useLocation();

  return (
    <li>
      <Link
        to={href}
        className={classNames(
          'inline-flex items-center p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group',
          {
            'bg-white text-blue-600 border-blue-600 hover:text-blue-600 hover:border-blue-600 active':
              location.pathname.includes(href),
            'text-gray-400 hover:text-gray-400 hover:border-b-transparent  cursor-not-allowed':
              disabled,
          },
          className
        )}
        aria-current='page'>
        {icon && (
          <span className={classNames('material-icons-outlined text-xl mr-2')}>
            {icon}
          </span>
        )}
        {text}
      </Link>
    </li>
  );
};

export default TabLink;
