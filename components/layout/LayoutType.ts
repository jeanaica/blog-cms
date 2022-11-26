import { NextPage } from 'next';
import { ReactElement } from 'react';

import Dashboard from './Dashboard';
import Shared from './Shared';

type DashboardType = NextPage & { Layout: typeof Dashboard };
type SharedType = NextPage & { Layout: typeof Shared };

export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

type LayoutType = DashboardType | SharedType;

export default LayoutType;
