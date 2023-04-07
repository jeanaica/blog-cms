import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import Nav from 'components/nav/Nav';
import Loading from 'components/loading/Loading';

import { usePageLoading } from 'lib/hooks/usePageLoading';

type Props = {
  children: ReactElement;
};

const Dashboard = ({ children }: Props) => {
  const isPageLoading = usePageLoading();

  const router = useRouter();
  const lastPath = router.pathname.split('/').pop();

  return (
    <div className='h-screen w-screen overflow-hidden md:grid md:grid-cols-[auto,1fr] md:grid-rows-[1fr,auto] min-w-[320px]'>
      <Nav />
      <div className='overflow-y-auto h-full'>
        {isPageLoading && !lastPath ? (
          <div className='flex justify-center h-full items-center'>
            <Loading size='lg' />
          </div>
        ) : (
          <div className='h-full w-full p-8 md:px-16 md:py-12'>{children}</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
