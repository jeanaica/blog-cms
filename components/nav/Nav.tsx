import { FC } from 'react';

import LinkText from 'components/nav/NavLink';
import ListItem from 'components/List/ListItem';
import Logo from 'components/logo/Logo';

import navJson from './nav.json';

const Nav: FC = () => {
  return (
    <div className='flex-col bg-white text-right md:text-center w-[250px] justify-center drop-shadow-[3px_0_3px_rgba(0,0,0,0.25)]'>
      <Logo />
      <ul>
        {navJson.map(({ icon, text, href }) => (
          <ListItem key={text}>
            <LinkText
              icon={icon}
              href={href}
              text={text}
            />
          </ListItem>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
