import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import Nav from 'components/nav/Nav';
import Loading from 'components/loading/Loading';

import { usePageLoading } from 'shared/utils/hooks/usePageLoading';
import { useAuth } from 'lib/auth/AuthContext';

import Header from './header/Header';

type Props = {
  children: ReactElement;
};

const Dashboard = ({ children }: Props) => {
  const isPageLoading = usePageLoading();
  const auth = useAuth();

  const router = useRouter();
  const lastPath = router.pathname.split('/').pop();

  if (!auth.user?.displayName) {
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
      <div className='bg-white md:col-start-2 overflow-y-auto'>
        {isPageLoading && !lastPath ? (
          <div className='flex justify-center h-full items-center'>
            <Loading
              size='lg'
              type='page'
            />
          </div>
        ) : (
          children
        )}
      </div>
      <Nav />
    </div>
  );
};

export default Dashboard;
