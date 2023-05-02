import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from 'components/form/input/Input';
import Icon from 'components/icon/Icon';
import Menu from 'components/menu/Menu';

type Props = {
  onSave: () => void;
  onSubmit: () => void;
};

const TitleMenu: FC<Props> = ({ onSave, onSubmit }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className='flex gap-2 sticky top-0 bg-white z-50 pt-4'>
      <div className='flex flex-[2] '>
        <Input
          label=''
          name='title'
          className='h-full p-0 font-PoppinsSemiBold md:text-2xl'
          placeholder='Tell your story...'
        />
      </div>

      <div className='flex flex-1 gap-2 mb-4'>
        <Menu
          text='Preview'
          loading={isSubmitting}
          options={[
            {
              text: 'Preview',
              icon: 'remove_red_eye',
              onClick: () => console.log('Preview'),
            },
            {
              text: 'Save',
              icon: 'save',
              onClick: onSave,
            },
          ]}
        />
        <button
          type='button'
          className='relative w-full flex items-center justify-center rounded font-semibold px-2 md:px-4 border hover:bg-slate-100'
          onClick={onSubmit}
          disabled={isSubmitting}>
          <Icon
            icon='send'
            className='text-xl md:text-3xl text-sky-700 rounded-md'
          />
          <span className='hidden md:flex md:ml-4'>Publish</span>
        </button>
      </div>
    </div>
  );
};

export default TitleMenu;