import { FC, ReactElement } from 'react';

type Props = {
  children?: ReactElement;
};

const TabSection: FC<Props> = ({ children }) => {
  return (
    <section className='h-full flex-[4] overflow-y-auto'>{children}</section>
  );
};

export default TabSection;
