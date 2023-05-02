import React, { useEffect } from 'react';

import Dashboard from 'components/layout/Dashboard';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/post');
  }, [router]);

  return <></>;
};

Page.Layout = Dashboard;

export default Page;
