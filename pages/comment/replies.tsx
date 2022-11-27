import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Replies from 'features/comment/Replies';

const RepliesPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Replies />;

RepliesPage.Layout = Dashboard;

export default RepliesPage;

export const getServerSideProps = protectedRoute();
