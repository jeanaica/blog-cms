import Footer from 'components/footer/Footer';
import Nav from 'components/nav/Nav';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const Dashboard = ({ children }: Props) => (
  <div className='h-screen w-screen grid overflow-hidden grid-cols-[auto,1fr] grid-rows-[1fr,auto]'>
    <Nav />
    <div className='overflow-y-auto'>{children}</div>
    <div className='col-span-2 z-10'>
      <Footer />
    </div>
  </div>
);

export default Dashboard;
