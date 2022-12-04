import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  size?: 'sm' | 'lg';
  className?: string;
  type?: 'page' | 'button';
};

const Loading: FC<Props> = ({ size = 'sm', className, type = 'button' }) => (
  <span
    className={classNames(
      'animate-spin material-icons-outlined ',
      { 'text-primary-300': type === 'page' },
      className
    )}
    style={{
      fontSize: size === 'lg' ? '5rem' : '24px',
    }}>
    timelapse
  </span>
);

export default Loading;
