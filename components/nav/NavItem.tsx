import classNames from 'classnames';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const NavItem: FC<Props> = ({ children, className }) => (
  <li className={classNames('flex items-centerm', className)}>{children}</li>
);

export default NavItem;
