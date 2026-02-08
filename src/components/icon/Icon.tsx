import classnames from 'classnames';
import { FC } from 'react';

type Props = {
  // we want to limit the icons used to material-icons only
  icon: string;
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | number;
};

const Icon: FC<Props> = ({ icon, className, size = 'sm' }) => {
  return (
    <span
      className={classnames(
        'material-icons-outlined',
        className,
        typeof size !== 'number' ? `text-${size}` : `text-[${size}px]`
      )}>
      {icon}
    </span>
  );
};

export default Icon;
