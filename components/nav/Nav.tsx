import { FC } from 'react';

import NavLink from 'components/nav/NavLink';
import NavItem from 'components/nav/NavItem';
import Logo from 'components/logo/Logo';

import navJson from './nav.json';
import { useRouter } from 'next/router';

interface NavItems {
  icon: string;
  text: string;
  href: string;
  isAction: boolean;
}

const Nav: FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  return (
    <div className='flex-col bg-white relative text-right md:text-center w-[250px] justify-center drop-shadow-[3px_0_3px_rgba(0,0,0,0.25)]'>
      <Logo />
      <ul>
        {navJson.map(({ text, icon, href, isAction }: NavItems) => (
          <NavItem key={text}>
            <NavLink
              icon={icon}
              href={href}
              text={text}
              isAction={isAction}
            />
          </NavItem>
        ))}

        <NavItem className='absolute bottom-0 left-0 w-full border-t'>
          <button
            className='px-8 py-4 w-full flex items-start hover:bg-gray-300'
            onClick={handleLogout}>
            <span className='material-icons-outlined text-xl mr-4'>logout</span>
            Logout
          </button>
        </NavItem>
      </ul>
    </div>
  );
};

export default Nav;
