import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  type?: 'info' | 'error' | 'success' | 'warning';
  message?: string | null;
};

const Alert: FC<Props> = ({ type = 'info', message }) => (
  <div
    className={classNames('p-4 mb-8 text-sm rounded-lg ease-in', {
      'text-red-700 bg-red-100': type === 'error',
      'text-blue-700 bg-blue-100': type === 'info',
      'text-green-700 bg-green-100': type === 'success',
      'text-yellow-700 bg-yellow-100': type === 'warning',
      hidden: !message,
      'ease-in block': message,
    })}
    role='alert'>
    {message}
  </div>
);

export default Alert;
