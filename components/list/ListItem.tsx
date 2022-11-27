import { FC, ReactElement } from 'react';

type Props = {
  children: ReactElement;
  actions?: ReactElement;
};

const ListItem: FC<Props> = ({ children, actions }) => (
  <li className='flex p-4 justify-between border-b-2'>
    {children}
    {actions && (
      <div className='flex flex-1 pt-6 items-center justify-end'>{actions}</div>
    )}
  </li>
);

export default ListItem;
