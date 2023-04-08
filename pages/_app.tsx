import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import LayoutType from 'components/layout/LayoutType';
import Dashboard from 'components/layout/Dashboard';
import { ToastProvider } from 'components/toast/context';
import ToastContainer from 'components/toast/ToastContainer';

import client from 'lib/client/apolloClient';
import { AuthProvider } from 'lib/auth/AuthProvider';

import '../shared/styles/globals.css';

type AppLayoutProps = AppProps & {
  Component: LayoutType;
  pageProps: any;
};

export default function App({ Component, pageProps }: AppLayoutProps) {
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Dashboard;

  return (
    <AuthProvider>
      <ToastProvider>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </ApolloProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
