import { type FC, type ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

const FieldLabel: FC<Props> = ({ htmlFor, children, className }) => {
  if (!children) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={classNames('block text-sm font-semibold text-primary', className)}>
      {children}
    </label>
  );
};

export default FieldLabel;
