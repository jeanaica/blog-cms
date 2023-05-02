import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import FileImage from 'components/form/file/FileImage';
import Input from 'components/form/input/Input';
import TextArea from 'components/textarea/TextArea';

const Meta = () => {
  const { watch, setValue } = useFormContext();
  const title: string = watch('title');

  useEffect(() => {
    const regExChars = /[^a-zA-Z 0-9 -]/g;
    const slug =
      title && title.toLowerCase().replace(regExChars, '').replaceAll(' ', '-');

    setValue('slug', slug);
  }, [title, setValue]);

  return (
    <>
      <Input
        label='Slug'
        name='slug'
        readOnly
      />
      <Input
        label='Author'
        name='author'
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
  );
};

export default Meta;
