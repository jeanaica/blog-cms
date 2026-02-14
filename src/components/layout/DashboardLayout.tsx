import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import Nav from 'components/nav/Nav';
import Loading from 'components/loading/Loading';
import FAB from 'components/fab/FAB';

import { useAuth } from 'lib/auth/AuthContext';

import Header from './Header';

const DashboardLayout = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

  // Check if we're on an edit/add page
  const isEditOrAddPage = location.pathname.includes('/add') ||
                          location.pathname.includes('/edit');

  return (
    <div className='h-screen w-screen grid grid-rows-[auto_1fr_auto] grid-cols-none	md:grid-rows-auto md:grid-cols-[auto_1fr]'>
      <Header />
      <div
        className={classNames('bg-white md:col-start-2 overflow-y-auto', {
          'bg-white': !location.pathname.includes('post'),
          'bg-slate-50': location.pathname.includes('post'),
        })}>
        <Outlet />
      </div>
      <Nav isEditOrAddPage={isEditOrAddPage} />
      <FAB hide={isEditOrAddPage} />
    </div>
  );
};

export default DashboardLayout;
