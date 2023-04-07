import { FC } from 'react';

import Icon from 'components/icon/Icon';

const Empty: FC = () => (
  <div className='flex justify-center p-12 flex-col items-center'>
    <Icon
      icon='rocket_launch'
      className='text-9xl text-gray-300'
    />
    <span className='text-gray-500'>Nothing here... </span>
  </div>
);

export default Empty;
