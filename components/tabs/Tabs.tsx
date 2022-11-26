import { useRouter } from 'next/router';
import { FC } from 'react';
import Tab from './Tab';

type Props = {
  tabs?: Array<{
    text: string;
    href: string;
    icon?: string;
    indexHref?: string;
  }>;
};

const Tabs: FC<Props> = ({ tabs }) => (
  <div className='border-b border-gray-200 bg-slate-100'>
    <ul className='flex flex-wrap -mb-[0.1rem] text-sm font-medium text-center text-gray-500 '>
      {tabs?.map(({ text, icon, href, indexHref }, index) => (
        <Tab
          key={index}
          href={href}
          text={text}
          icon={icon}
          indexHref={indexHref}
        />
      ))}
    </ul>
  </div>
);

export default Tabs;
