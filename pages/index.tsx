import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';

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
