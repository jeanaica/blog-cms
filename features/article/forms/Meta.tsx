import FileImage from 'components/form/file/FileImage';
import Input from 'components/form/input/Input';
import TextArea from 'components/textarea/TextArea';

const Meta = () => (
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
    <Input
      label='Image Alt'
      name='imageAlt'
    />
    <Input
      label='Caption'
      name='caption'
    />
  </>
);

export default Meta;
