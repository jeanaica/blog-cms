import { BaseSyntheticEvent, FC } from 'react';

import Input from 'components/form/input/Input';
import Button from 'components/button/Button';
import Icon from 'components/icon/Icon';

type Props = {
  onSubmit:
    | ((e?: BaseSyntheticEvent<object, any, any> | undefined) => any)
    | undefined;
};

const FormHeader: FC<Props> = ({ onSubmit }) => (
  <form
    onSubmit={onSubmit}
    className='flex gap-10 justify-between'>
    <Input
      label=''
      name='title'
      className='text-2xl font-PoppinsSemiBold'
      placeholder='Tell your story...'
    />
    <div className='flex gap-4 mt-1'>
      <Button
        outlined
        large
        className='flex-1 h-[50px]'>
        <Icon
          icon='visibility'
          className='mr-2 text-lg'
        />
        Preview
      </Button>
      <Button
        large
        className='flex-1 h-[50px] w-[200px]'>
        <span>Save As Draft</span>
      </Button>
      <Button
        type='submit'
        large
        className='flex-1 h-[50px]'>
        Save
      </Button>
    </div>
  </form>
);

export default FormHeader;
