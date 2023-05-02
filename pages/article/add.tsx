import React from 'react';

import Dashboard from 'components/layout/Dashboard';
import Add from 'features/article/Add';

const NewPage = () => <Add />;

NewPage.Layout = Dashboard;

export default NewPage;
