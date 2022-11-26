import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const Shared = ({ children }: Props) => children;

export default Shared;
