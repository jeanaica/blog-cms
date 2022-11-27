import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import New from 'features/article/New';

const NewPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <New />;

NewPage.Layout = Dashboard;

export default NewPage;

export const getServerSideProps = protectedRoute();
