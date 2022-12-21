import { FC, useEffect } from 'react';

import TabSection from 'components/tabs/TabSection';
import Input from 'components/form/input/Input';
import FileImage from 'components/form/file/FileImage';
import { useFormContext } from 'react-hook-form';
import TextArea from 'components/textarea/TextArea';

type Props = {
  active?: boolean;
};

const MetaSection: FC<Props> = ({ active }) => {
  const { watch, setValue } = useFormContext();
  const title: string = watch('title');

  useEffect(() => {
    const regExChars = /[^a-zA-Z 0-9 -]/g;
    const slug =
      title && title.toLowerCase().replace(regExChars, '').replaceAll(' ', '-');

    setValue('slug', slug);
  }, [title, setValue]);

  return (
    <form>
      <TabSection
        active={active}
        isSamePage>
        <>
          <Input
            label='Slug'
            name='slug'
            readOnly
          />
          <TextArea
            label='Description'
            name='description'
            rows={3}
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
