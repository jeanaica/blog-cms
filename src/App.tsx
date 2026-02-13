import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';

import { AuthProvider } from 'lib/auth/AuthProvider';
import { ToastProvider } from 'components/toast/context';
import ToastContainer from 'components/toast/ToastContainer';
import client from 'lib/client/apolloClient';

import DashboardLayout from 'components/layout/DashboardLayout';
import SharedLayout from 'components/layout/SharedLayout';

const PostPage = lazy(() => import('./pages/PostPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AddArticlePage = lazy(() => import('./pages/AddArticlePage'));
const EditArticlePage = lazy(() => import('./pages/EditArticlePage'));
const ViewArticlePage = lazy(() => import('./pages/ViewArticlePage'));
const PreviewArticlePage = lazy(() => import('./pages/PreviewArticlePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

function RootLayout() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ToastProvider>
          <ApolloProvider client={client}>
            <Suspense>
              <Outlet />
            </Suspense>
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
      {
        path: '/',
        element: (
          <Navigate
            to='/post'
            replace
          />
        ),
      },
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
          { path: '/galleries', element: <GalleryPage /> },
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
