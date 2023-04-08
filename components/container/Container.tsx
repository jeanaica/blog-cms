import { FC, ReactElement } from 'react';
import classNames from 'classnames';

import Loading from 'components/loading/Loading';

import Empty from './Empty';

type Props = {
  children: ReactElement;
  loading?: boolean;
  isEmpty?: boolean;
  full?: boolean;
};

const Container: FC<Props> = ({ children, loading, isEmpty, full }) => (
  <div
    className={classNames('prose p-0', {
      'w-screen h-screen': full,
    })}>
    {loading ? (
      <div className='flex justify-center p-12 flex-col items-center'>
        <Loading className='text-gray-500' />
        <span className='text-gray-500'>Loading... </span>
      </div>
    ) : isEmpty ? (
      <Empty />
    ) : (
      children
    )}
  </div>
);

export default Container;
