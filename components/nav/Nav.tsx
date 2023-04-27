import { FC, useState } from 'react';
import classNames from 'classnames';

import NavItem from 'components/nav/NavItem';

import navJson from './nav.json';

interface NavItems {
  icon: string;
  text: string;
  href: string;
  isAction: boolean;
}

type Props = {};

const Nav: FC<Props> = () => {
  const [collapseMenu, setCollapseMenu] = useState(false);

  const handleCollapse = () => {
    setCollapseMenu(!collapseMenu);
  };

  return (
    <div
      className={classNames(
        `bg-white relative flex w-full text-center border-t md:flex-col md:row-start-2 md:border-t-0 md:border-r md:transition-transform md:duration-100`,
        {
          'md:w-[auto] md:-translate-x-0 md:ml-auto': collapseMenu,
          'md:w-[250px]': !collapseMenu,
        }
      )}>
      {navJson.map(({ text, icon, href, isAction }: NavItems) => (
        <NavItem
          key={text}
          icon={icon}
          href={href}
          text={text}
          isAction={isAction}
          collapsed={collapseMenu}
        />
      ))}
      <NavItem
        icon={
          collapseMenu
            ? 'keyboard_double_arrow_right'
            : 'keyboard_double_arrow_left'
        }
        text='Collapse'
        collapsed={collapseMenu}
        onClick={handleCollapse}
        className='hidden md:flex md:w-full absolute bottom-0'
      />
    </div>
  );
};

export default Nav;
