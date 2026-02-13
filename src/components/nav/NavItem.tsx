import classNames from 'classnames';
import { FC, MouseEventHandler } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  className?: string;
  href?: string;
  icon: string;
  iconClassName?: string;
  text: string;
  isAction?: boolean;
  collapsed?: boolean;
  onClick?: MouseEventHandler;
};

const NavItem: FC<Props> = ({
  className,
  href,
  icon,
  text,
  isAction = false,
  collapsed,
  onClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick: MouseEventHandler = e => {
    e.preventDefault();
    if (href) {
      navigate(href);
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={classNames(
        'flex-1 justify-center py-4 hover:bg-gray-300 border-r-0 flex md:flex-none md:justify-start md:content-center md:items-center md:px-8 transition-all duration-300',
        className,
        {
          'bg-gray-200':
            href &&
            (location.pathname === href ||
              location.pathname.startsWith(href + '/')),
          'border-x md:border-y md:border-x-0': isAction,
        }
      )}>
      <span
        className={classNames('material-icons-outlined text-xl mr-0', {
          'md:mr-4': !collapsed,
        })}>
        {icon}
      </span>
      <span
        className={classNames('hidden', {
          'md:hidden': collapsed,
          'md:flex': !collapsed,
        })}>
        {text}
      </span>
    </button>
  );
};

export default NavItem;
