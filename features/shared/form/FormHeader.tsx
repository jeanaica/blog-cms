import { BaseSyntheticEvent, FC } from 'react';

import Input from 'components/form/input/Input';
import Button from 'components/button/Button';
import { useFormContext } from 'react-hook-form';

type Props = {
  onSubmit:
    | ((e?: BaseSyntheticEvent<object, any, any> | undefined) => any)
    | undefined;
  onSubmitDraft:
    | ((e?: BaseSyntheticEvent<object, any, any> | undefined) => any)
    | undefined;
};

const FormHeader: FC<Props> = ({ onSubmit, onSubmitDraft }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <form className='flex gap-10 justify-between'>
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
          type='submit'
          className='flex-1 h-[50px] w-[200px]'
          onClick={onSubmitDraft}
          disabled={isSubmitting}>
          <span>Save As Draft</span>
        </Button>
        <Button
          large
          type='submit'
          className='flex-1 h-[50px]'
          onClick={onSubmit}
          disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormHeader;
