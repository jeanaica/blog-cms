import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  icon: string;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | number;
};

const Icon: FC<Props> = ({ icon, className, size = 'sm' }) => {
  return (
    <span
      className={clsx(
        'material-icons-outlined',
        className,
        typeof size !== 'number' ? `text-${size}` : `text-[${size}px]`
      )}>
      {icon}
    </span>
  );
};

export default Icon;
