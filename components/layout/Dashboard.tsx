import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import Nav from 'components/nav/Nav';
import Loading from 'components/loading/Loading';
import PostLayout from 'features/post/PostLayout';
import { usePageLoading } from 'lib/hooks/usePageLoading';
import CommentLayout from 'features/comment/CommentLayout';

type Props = {
  children: ReactElement;
};

const Dashboard = ({ children }: Props) => {
  const isPageLoading = usePageLoading();

  const router = useRouter();
  const lastPath = router.pathname.split('/').pop();

  const componentChild = () => {
    switch (true) {
      case router.pathname.includes('post'):
        return <PostLayout>{children}</PostLayout>;

      case router.pathname.includes('comment'):
        return <CommentLayout>{children}</CommentLayout>;

      default:
        return <div className='bg-gray h-full'>{children}</div>;
    }
  };

  return (
    <div className='h-screen w-screen grid overflow-hidden grid-cols-[auto,1fr] grid-rows-[1fr,auto] bg-slate-100'>
      <Nav />
      <div className='overflow-y-auto h-full'>
        {isPageLoading && !lastPath ? (
          <div className='flex justify-center h-full items-center'>
            <Loading size='lg' />
          </div>
        ) : (
          <div className='h-full w-full px-16 py-12'>{componentChild()}</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
