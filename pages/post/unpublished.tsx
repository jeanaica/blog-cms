import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Unpublished from 'features/post/Unpublished';

const UnpublishedPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Unpublished />;

UnpublishedPage.Layout = Dashboard;

export default UnpublishedPage;

export const getServerSideProps = protectedRoute();
