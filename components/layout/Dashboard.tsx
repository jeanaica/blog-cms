import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import Footer from 'components/footer/Footer';
import Nav from 'components/nav/Nav';
import PostLayout from 'features/post/PostLayout';

type Props = {
  children: ReactElement;
};

const Dashboard = ({ children }: Props) => {
  const router = useRouter();
  const componentChild = router.pathname.includes('post') ? (
    <PostLayout>{children}</PostLayout>
  ) : (
    <div className='bg-gray h-full'>{children}</div>
  );

  return (
    <div className='h-screen w-screen grid overflow-hidden grid-cols-[auto,1fr] grid-rows-[1fr,auto]'>
      <Nav />
      <div className='overflow-y-auto h-full'>
        <div className='h-full w-full p-8 bg-slate-100'>{componentChild}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
