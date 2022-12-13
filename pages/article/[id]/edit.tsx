import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Edit from 'features/article/Edit';

const EditPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Edit />;

EditPage.Layout = Dashboard;

export default EditPage;

export const getServerSideProps = protectedRoute();
