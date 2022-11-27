import { FC, useState } from 'react';

import Tabs from 'components/tabs/Tabs';

import ContentSection from './ContentSection';
import MetaSection from './MetaSection';

const FormTabs: FC = () => {
  const [active, setActive] = useState('content');

  const handleClick = (activeTab: string) => {
    setActive(activeTab);
  };

  return (
    <div className='flex-[3] bg-white border shadow-sm'>
      <Tabs
        active={active}
        onClick={handleClick}
        tabs={[
          {
            name: 'content',
            text: 'Content',
          },
          {
            name: 'meta',
            text: 'Meta',
          },
        ]}
      />
      <div className='bg-white px-12 py-8 min-h-[520px]'>
        <ContentSection active={active === 'content'} />
        <MetaSection active={active === 'meta'} />
      </div>
    </div>
  );
};

export default FormTabs;
