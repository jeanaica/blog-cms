import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Nav from 'components/nav/Nav';
import Loading from 'components/loading/Loading';

import { useAuth } from 'lib/auth/AuthContext';

import Header from './Header';

const DashboardLayout = () => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user?.email) {
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Loading
          size='lg'
          type='page'
        />
      </div>
    );
  }

  return (
    <div className='h-screen w-screen grid grid-rows-[auto_1fr_auto] grid-cols-none	md:grid-rows-auto md:grid-cols-[auto_1fr]'>
      <Header />
      <div
        className={classNames('bg-white md:col-start-2 overflow-y-auto', {
          'bg-white':
            !location.pathname.includes('post') &&
            !location.pathname.includes('galleries'),
          'bg-slate-50':
            location.pathname.includes('post') ||
            location.pathname.includes('galleries'),
        })}>
        <Outlet />
      </div>
      <Nav />
    </div>
  );
};

export default DashboardLayout;
