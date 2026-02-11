import { type FC } from 'react';

import Icon from 'components/icon/Icon';

const FieldErrorIcon: FC = () => (
  <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
    <Icon
      icon='error_outline'
      size='xl'
      className='text-error-300'
    />
  </div>
);

export default FieldErrorIcon;
