import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ListItem: FC<Props> = ({ children }) => (
  <li className='flex items-center'>{children}</li>
);

export default ListItem;
