import classnames from 'classnames';
import { FC } from 'react';

const SIZE_CLASSES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
} as const;

type Props = {
  // we want to limit the icons used to material-icons only
  icon: string;
  className?: string;
  size?: keyof typeof SIZE_CLASSES | number;
};

const Icon: FC<Props> = ({ icon, className, size = 'base' }) => {
  return (
    <span
      className={classnames(
        'material-icons-outlined',
        className,
        typeof size === 'number' ? `text-[${size}px]` : SIZE_CLASSES[size]
      )}>
      {icon}
    </span>
  );
};

export default Icon;
