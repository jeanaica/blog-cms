import { type FC } from 'react';
import classNames from 'classnames';

type Props = {
  message?: string;
  className?: string;
};

const FieldError: FC<Props> = ({ message, className }) => {
  if (!message) return null;

  return (
    <span className={classNames('text-sm text-error-300', className)}>
      {message}
    </span>
  );
};

export default FieldError;
