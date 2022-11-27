import classNames from 'classnames';
import { FC, ReactElement } from 'react';

type Props = {
  children?: ReactElement;
  active?: boolean;
  className?: string;
  isSamePage?: boolean;
};

const TabSection: FC<Props> = ({
  children,
  active = false,
  className,
  isSamePage = false,
}) => (
  <section
    className={classNames(
      'h-full flex-[4] overflow-y-auto',
      {
        hidden: !active && isSamePage,
      },
      className
    )}>
    {children}
  </section>
);

export default TabSection;
