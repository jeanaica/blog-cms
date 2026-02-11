import { type FC } from 'react';
import classNames from 'classnames';

type Props = {
  text?: string;
  className?: string;
};

const HelperText: FC<Props> = ({ text, className }) => {
  if (!text) return null;

  return (
    <p className={classNames('text-xs text-secondary-500', className)}>
      {text}
    </p>
  );
};

export default HelperText;
