import { FC } from 'react';

const year = new Date().getFullYear();

const Footer: FC = () => (
  <div className='bg-accent-500 p-4'>
    <h5 className='text-primary-100'>Copyright © {year} Jeanaica Suplido.</h5>
  </div>
);

export default Footer;
