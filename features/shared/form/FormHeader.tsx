import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Input from 'components/form/input/Input';
import Dropdown from 'components/button/Dropdown';

import { isToday } from 'lib/utils/dateHelpers';

type Props = {
  showButtons: {
    isDraft?: boolean;
    isScheduled?: boolean;
    isPublished?: boolean;
  };
  onSubmit(type: string): void;
};

const FormHeader: FC<Props> = ({ showButtons, onSubmit }) => {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext();
  const { isDraft, isPublished, isScheduled } = showButtons;
  const isPostDateToday = isToday(watch('postDate'));

  return (
    <form className='flex gap-12 justify-between'>
      <div className='flex-[3]'>
        <Input
          label=''
          name='title'
          className='text-2xl font-PoppinsSemiBold '
          placeholder='Tell your story...'
        />
      </div>
      <div className='flex gap-4 mt-1 flex-1'>
        <Dropdown
          text='Save'
          className='flex-1 h-[50px]'
          disabled={isSubmitting}
          options={[
            {
              text: 'Save as Draft',
              action: () => onSubmit('isDraft'),
              hide: !isDraft,
            },
            {
              text: 'Schedule Post',
              action: () => onSubmit('isScheduled'),
              hide: !isDraft || isPublished || isPostDateToday,
            },
            {
              text: 'Publish Now',
              action: () => onSubmit('isPublished'),
              hide: isPublished,
            },
            {
              text: 'Update Article',
              action: () => onSubmit('isPublished'),
              hide: !isPublished,
            },
          ]}
          separateOptions={[
            {
              text: 'Unpublish',
              action: () => onSubmit('isUnpublished'),
              hide: !isPublished,
            },
            {
              text: 'Move to Drafts',
              action: () => onSubmit('isDraft'),
              hide: !isScheduled,
            },
          ]}
        />
      </div>
    </form>
  );
};

export default FormHeader;
