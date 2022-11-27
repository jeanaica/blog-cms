import { FC } from 'react';
import Tab from './Tab';
import TabLink from './TabLink';

type Props = {
  isPage?: boolean;
  active?: string;
  onClick?(name: string): void;
  tabs?: Array<{
    text: string;
    href?: string;
    icon?: string;
    indexHref?: string;
    name?: string;
  }>;
};

const Tabs: FC<Props> = ({ tabs, isPage, active, onClick }) => (
  <div className='border-b border-gray-200 bg-slate-100'>
    <ul className='flex flex-wrap -mb-[0.1rem] text-sm font-medium text-center text-gray-500 '>
      {isPage
        ? tabs?.map(({ text, icon, href, indexHref }, index) => (
            <TabLink
              key={index}
              href={href}
              text={text}
              icon={icon}
              indexHref={indexHref}
            />
          ))
        : tabs?.map(({ text, icon, name }, index) => (
            <Tab
              key={index}
              text={text}
              icon={icon}
              active={active === name}
              name={name}
              onClick={onClick}
            />
          ))}
    </ul>
  </div>
);

export default Tabs;
