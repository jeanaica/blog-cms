import React from 'react';

import Dashboard from 'components/layout/Dashboard';
import Drafts from 'features/post/Drafts';

const DraftPage = () => <Drafts />;

DraftPage.Layout = Dashboard;

export default DraftPage;
