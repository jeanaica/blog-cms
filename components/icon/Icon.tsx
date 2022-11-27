import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  icon: string;
  className?: string;
};

const Icon: FC<Props> = ({ icon, className }) => {
  return (
    <span className={classNames('material-icons-outlined text-sm', className)}>
      {icon}
    </span>
  );
};

export default Icon;
