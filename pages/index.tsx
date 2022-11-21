import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import { signOut } from 'firebase/auth';

import Dashboard from 'components/layout/dashboard/Dashboard';
import protectedRoute from 'lib/protectedRoute';

const Page = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <>
      <p>{props.message!}</p>
    </>
  );
};

Page.Layout = Dashboard;

export default Page;

export const getServerSideProps = protectedRoute();
