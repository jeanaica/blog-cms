import { FC } from 'react';

import TabSection from 'components/tabs/TabSection';
import Input from 'components/form/input/Input';
import FileImage from 'components/form/file/FileImage';

type Props = {
  active?: boolean;
};

const MetaSection: FC<Props> = ({ active }) => {
  return (
    <form>
      <TabSection
        active={active}
        isSamePage>
        <>
          <Input
            label='Slug'
            name='slug'
          />
          <Input
            label='Description'
            name='description'
          />
          <FileImage
            label='Banner'
            name='banner'
            helperText='PNG, JPG or JPEG (MAX. 10MB).'
          />
        </>
      </TabSection>
    </form>
  );
};

export default MetaSection;
