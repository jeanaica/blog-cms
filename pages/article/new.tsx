import React from 'react';

import Dashboard from 'components/layout/Dashboard';
import New from 'features/article/New';

const NewPage = () => <New />;

NewPage.Layout = Dashboard;

export default NewPage;
