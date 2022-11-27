import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Read from 'features/comment/Read';

const ReadPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Read />;

ReadPage.Layout = Dashboard;

export default ReadPage;

export const getServerSideProps = protectedRoute();
