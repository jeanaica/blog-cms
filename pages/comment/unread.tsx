import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Unread from 'features/comment/Unread';

const UnreadPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Unread />;

UnreadPage.Layout = Dashboard;

export default UnreadPage;

export const getServerSideProps = protectedRoute();
