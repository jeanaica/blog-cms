import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { signOut } from 'firebase/auth';
import classNames from 'classnames';

import { auth } from 'lib/firebase/client';

import Logo from 'components/logo/Logo';
import Icon from 'components/icon/Icon';

import useDetectOutsideClick from 'shared/utils/hooks/useDetectOutsideClick';

type Props = {};

const Header: FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useDetectOutsideClick(headerRef);
  const router = useRouter();

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

  return (
    <header
      className='py-2 px-4 border-b flex justify-end relative z-50 bg-white col-span-full md:col-span-2'
      ref={headerRef}>
      <button
        className='flex items-center rounded px-4 hover:bg-slate-300'
        onClick={handleShowMenu}
        type='button'>
        <Logo />
        <Icon
          icon='keyboard_arrow_down'
          className='ml-4'
        />
      </button>

      <button
        onClick={handleLogout}
        className={classNames(
          `bg-white drop-shadow rounded-b absolute top-[57px] px-4 py-2`,
          {
            hidden: !showMenu,
            flex: showMenu,
          }
        )}>
        <span className='material-icons-outlined text-xl mr-4'>logout</span>
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Header;
