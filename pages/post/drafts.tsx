import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Drafts from 'features/post/Drafts';

const DraftPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Drafts />;

DraftPage.Layout = Dashboard;

export default DraftPage;

export const getServerSideProps = protectedRoute();
