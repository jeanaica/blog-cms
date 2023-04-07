import React from 'react';

import Dashboard from 'components/layout/Dashboard';
import Posts from 'features/post/Posts';

const PostPage = () => <Posts />;

PostPage.Layout = Dashboard;

export default PostPage;
