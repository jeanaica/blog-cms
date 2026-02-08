import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from 'lib/auth/AuthProvider';
import { ToastProvider } from 'components/toast/context';
import ToastContainer from 'components/toast/ToastContainer';
import client from 'lib/client/apolloClient';

import DashboardLayout from 'components/layout/DashboardLayout';
import SharedLayout from 'components/layout/SharedLayout';

import PostPage from './pages/PostPage';
import AddArticlePage from './pages/AddArticlePage';
import EditArticlePage from './pages/EditArticlePage';
import ViewArticlePage from './pages/ViewArticlePage';
import PreviewArticlePage from './pages/PreviewArticlePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';

function RootLayout() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ToastProvider>
          <ApolloProvider client={client}>
            <Outlet />
            <ToastContainer />
          </ApolloProvider>
        </ToastProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Navigate to="/post" replace /> },
      {
        element: <SharedLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/article/:id/view', element: <ViewArticlePage /> },
          { path: '/article/:id/preview', element: <PreviewArticlePage /> },
          { path: '*', element: <ErrorPage /> },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: '/post', element: <PostPage /> },
          { path: '/article/add', element: <AddArticlePage /> },
          { path: '/article/:id/edit', element: <EditArticlePage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
