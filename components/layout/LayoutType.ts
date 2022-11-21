import { NextPage } from 'next';
import { ReactElement } from 'react';

import Dashboard from './dashboard/Dashboard';
import Shared from './shared/Shared';

type DashboardType = NextPage & { Layout: typeof Dashboard };
type SharedType = NextPage & { Layout: typeof Shared };

export type LayoutProps = ({
  children,
}: {
  children: ReactElement;
}) => ReactElement;

type LayoutType = DashboardType | SharedType;

export default LayoutType;
