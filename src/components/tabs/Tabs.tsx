import classNames from 'classnames';
import type { FC } from 'react';
import Tab from './Tab';
import TabLink from './TabLink';

type Props = {
  isPage?: boolean;
  active?: string;
  onClick?(name: string): void;
  className?: string;
  tabs?: Array<{
    text: string;
    href?: string;
    icon?: string;
    name?: string;
    hasError?: boolean;
  }>;
};

const Tabs: FC<Props> = ({ className, tabs, isPage, active, onClick }) => {
  return (
    <div
      className={classNames('border border-gray-200 bg-slate-100', className)}>
      <ul className='flex flex-wrap -mb-[0.1rem] text-sm font-medium text-center text-gray-500 '>
        {isPage
          ? tabs?.map(({ text, icon, href }, index) => (
              <TabLink
                key={index}
                href={href}
                text={text}
                icon={icon}
              />
            ))
          : tabs?.map(({ text, icon, name, hasError }, index) => (
              <Tab
                key={index}
                text={text}
                icon={icon}
                active={active === name}
                hasError={hasError}
                name={name}
                onClick={onClick}
              />
            ))}
      </ul>
    </div>
  );
};

export default Tabs;
