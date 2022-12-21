import React from 'react';

import Dashboard from 'components/layout/Dashboard';
import Read from 'features/comment/Read';

const ReadPage = () => <Read />;

ReadPage.Layout = Dashboard;

export default ReadPage;
