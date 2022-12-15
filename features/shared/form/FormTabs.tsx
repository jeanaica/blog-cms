import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Tabs from 'components/tabs/Tabs';

import ContentSection from './ContentSection';
import MetaSection from './MetaSection';

const FormTabs: FC = () => {
  const [active, setActive] = useState('content');
  const contentFields = ['content'];
  const metaFields = ['slug', 'description', 'banner'];

  const {
    register,
    formState: { errors },
  } = useFormContext();

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
            hasError: Object.keys(errors).some(key =>
              contentFields.includes(key)
            ),
          },
          {
            name: 'meta',
            text: 'Meta',
            hasError: Object.keys(errors).some(key => metaFields.includes(key)),
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
