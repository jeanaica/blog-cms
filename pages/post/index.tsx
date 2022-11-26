import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import protectedRoute from 'lib/routes/protectedRoute';
import Post from 'features/post/Post';

const Page = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <Post />;

Page.Layout = Dashboard;

export default Page;

export const getServerSideProps = protectedRoute();
