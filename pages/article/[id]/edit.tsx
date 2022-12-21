import React from 'react';
import { InferGetServerSidePropsType } from 'next';

import Dashboard from 'components/layout/Dashboard';
import Edit from 'features/article/Edit';

const EditPage = () => <Edit />;

EditPage.Layout = Dashboard;

export default EditPage;
