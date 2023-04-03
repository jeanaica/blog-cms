import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from 'provider/AuthProvider';
import LayoutType from 'components/layout/LayoutType';
import Dashboard from 'components/layout/Dashboard';
import client from 'lib/client/apolloClient';

import '../styles/globals.css';

type AppLayoutProps = AppProps & {
  Component: LayoutType;
  pageProps: any;
};

export default function App({ Component, pageProps }: AppLayoutProps) {
  // Use the layout defined at the page level, if available
  const Layout = Component.Layout || Dashboard;

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </AuthProvider>
  );
}
