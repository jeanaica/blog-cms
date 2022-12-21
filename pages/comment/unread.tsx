import React from 'react';

import Dashboard from 'components/layout/Dashboard';
import Unread from 'features/comment/Unread';

const UnreadPage = () => <Unread />;

UnreadPage.Layout = Dashboard;

export default UnreadPage;
