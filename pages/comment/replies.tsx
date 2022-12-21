import React from 'react';

import Dashboard from 'components/layout/Dashboard';
import Replies from 'features/comment/Replies';

const RepliesPage = () => <Replies />;

RepliesPage.Layout = Dashboard;

export default RepliesPage;
