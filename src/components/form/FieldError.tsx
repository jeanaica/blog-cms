import { type FC } from 'react';
import classNames from 'classnames';

type Props = {
  message?: string;
  className?: string;
};

const FieldError: FC<Props> = ({ message, className }) => {
  if (!message) return null;

  return (
    <p className={classNames('text-xs text-error-300', className)}>
      {message}
    </p>
  );
};

export default FieldError;
