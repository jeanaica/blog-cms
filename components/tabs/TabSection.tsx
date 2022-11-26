import { FC, ReactElement } from 'react';

type Props = {
  children?: ReactElement;
};

const TabSection: FC<Props> = ({ children }) => {
  return <section className='px-8 py-4 h-full'>{children}</section>;
};

export default TabSection;
