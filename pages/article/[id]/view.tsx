import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import protectedRoute from 'lib/routes/protectedRoute';
import View from 'features/article/View';
import Shared from 'components/layout/Shared';

const ViewPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => <View />;

ViewPage.Layout = Shared;

export default ViewPage;

export const getServerSideProps = protectedRoute();
