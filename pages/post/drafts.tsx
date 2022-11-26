import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Drafts from 'features/post/Drafts';

const Page = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Drafts />;

Page.Layout = Dashboard;

export default Page;

export const getServerSideProps = protectedRoute();
