import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Scheduled from 'features/post/Scheduled';

const ScheduledPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Scheduled />;

ScheduledPage.Layout = Dashboard;

export default ScheduledPage;

export const getServerSideProps = protectedRoute();
