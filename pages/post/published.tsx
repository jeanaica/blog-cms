import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Published from 'features/post/Published';

const PublishedPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Published />;

PublishedPage.Layout = Dashboard;

export default PublishedPage;

export const getServerSideProps = protectedRoute();
