import { FC, useEffect, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import NavLink from 'components/nav/NavLink';
import NavItem from 'components/nav/NavItem';
import Logo from 'components/logo/Logo';
import IconButton from 'components/icon/IconButton';

import { auth } from 'lib/firebase/client';
import useDetectOutsideClick from 'lib/hooks/useDetectOutsideClick';

import navJson from './nav.json';

interface NavItems {
  icon: string;
  text: string;
  href: string;
  isAction: boolean;
}

const Nav: FC = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const isClickedOutside = useDetectOutsideClick(menuRef);

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      router.push('/login');
    });
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (isClickedOutside) {
      setShowMenu(false);
    }
  }, [isClickedOutside]);

  useEffect(() => {
    setShowMenu(false);
  }, [router.asPath]);

  return (
    <div
      ref={menuRef}
      className='flex flex-col bg-white relative text-center md:w-[250px] border-r md:h-full'>
      <div className='flex items-center border-b md:border-0'>
        <IconButton
          icon={showMenu ? 'close' : 'menu'}
          className='ml-4 md:hidden'
          onClick={handleShowMenu}
        />
        <Logo />
      </div>
      <div
        className={classNames(
          'w-[200px] absolute top-[6.30rem] z-10 bg-white drop-shadow-md md:block md:relative md:drop-shadow-none md:w-full md:top-0 md:h-full',
          {
            hidden: !showMenu,
            block: showMenu,
          }
        )}>
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

        <NavItem className='w-full border-t md:absolute md:bottom-0'>
          <button
            className='px-8 py-4 w-full flex items-start hover:bg-gray-300'
            onClick={handleLogout}>
            <span className='material-icons-outlined text-xl mr-4'>logout</span>
            Logout
          </button>
        </NavItem>
      </div>
    </div>
  );
};

export default Nav;
