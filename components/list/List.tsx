import { FC, ReactElement } from 'react';

import Loading from 'components/Loading';

import EmptyList from './EmptyList';

type Props = {
  children: ReactElement;
  loading?: boolean;
  isEmpty?: boolean;
};

const List: FC<Props> = ({ children, loading, isEmpty }) => (
  <ul className='prose p-0 px-10 py-4'>
    {loading ? (
      <div className='flex justify-center p-12 flex-col items-center'>
        <Loading className='text-gray-500' />
        <span className='text-gray-500'>Loading... </span>
      </div>
    ) : isEmpty ? (
      <EmptyList />
    ) : (
      children
    )}
  </ul>
);

export default List;
