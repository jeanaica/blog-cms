import { FC, ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const List: FC<Props> = ({ children }) => (
  <ul className='prose p-0 px-10 py-4'>{children}</ul>
);

export default List;
