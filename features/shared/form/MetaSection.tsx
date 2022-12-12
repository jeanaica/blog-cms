import { FC } from 'react';

import TabSection from 'components/tabs/TabSection';
import Editor from 'components/form/editor/Editor';
import Input from 'components/form/input/Input';
import File from 'components/form/file/File';

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
          <File
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
