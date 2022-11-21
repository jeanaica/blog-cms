import { AppProps } from 'next/app';

import { AuthProvider } from 'provider/AuthProvider';
import LayoutType from 'components/layout/LayoutType';
import Dashboard from 'components/layout/dashboard/Dashboard';

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
