import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from 'components/form/Input';
import Menu from 'components/Menu';
import Button from 'components/button/Button';

type Props = {
  onPreview: () => void;
  onSave: () => void;
  onSubmit: () => void;
  previewUrl: string;
  status?: string;
};

const TitleMenu: FC<Props> = ({
  onPreview,
  onSave,
  onSubmit,
  previewUrl,
  status,
}) => {
  const {
    formState: { isSubmitting, isDirty },
  } = useFormContext();

  return (
    <div className='flex gap-2 sticky top-0 bg-white z-20 pt-4'>
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
              href: previewUrl,
              text: 'Preview',
              icon: 'remove_red_eye',
              onClick: onPreview,
            },
            {
              text: 'Save',
              icon: 'save',
              onClick: onSave,
              hide: !!status && status !== 'DRAFT',
              disabled: (!!status && status !== 'DRAFT') || !isDirty,
            },
          ]}
        />

        <Button
          text='Publish'
          primary
          icon='send'
          onClick={onSubmit}
          disabled={isSubmitting || !isDirty}
        />
      </div>
    </div>
  );
};

export default TitleMenu;
