import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from 'components/button/Button';
import TextArea from 'components/form/TextArea';
import Input from 'components/form/Input';
import FileImage from 'components/form/FileImage';

import { type ThoughtInput } from '../types';

type Props = {
  onSubmit: () => void;
  onSave: () => void;
  submitting?: boolean;
  isEdit?: boolean;
};

const ThoughtForm: FC<Props> = ({ onSubmit, onSave, submitting, isEdit }) => {
  const { register } = useFormContext<ThoughtInput>();

  return (
    <div className='max-w-2xl mx-auto px-4 pt-2 pb-2'>
      <div className='flex gap-2 sticky top-0 bg-white z-20 py-2 mb-6 shadow-sm -mx-8 px-8'>
        <h1 className='flex flex-[2] items-center text-lg md:text-2xl font-PoppinsSemiBold'>
          {isEdit ? 'Edit Thought' : 'New Thought'}
        </h1>
        <div className='flex flex-1 gap-2'>
          <Button
            onClick={onSave}
            icon='move_to_inbox'
            disabled={submitting}>
            Draft
          </Button>
          <Button
            primary
            icon='send'
            onClick={onSubmit}
            isLoading={submitting}>
            Publish
          </Button>
        </div>
      </div>

      <TextArea
        label='Text'
        name='text'
        rows={4}
        placeholder="What's on your mind?"
        isSubmitting={submitting}
      />

      <div className='flex items-center gap-4 mb-4'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='checkbox'
            {...register('isQuote')}
            className='w-4 h-4 rounded border-gray-300'
          />
          <span className='text-sm font-medium text-gray-700'>
            This is a quote
          </span>
        </label>
      </div>

      <Input
        label='Tags'
        name='tagsInput'
        placeholder='Comma-separated tags (e.g., coding, life, design)'
        helperText='Separate tags with commas'
      />

      <FileImage
        label='Image (Optional)'
        name='imageFile'
        disabled={submitting}
      />

      <Input
        label='Image Alt Text'
        name='image.alt'
        placeholder='Describe the image for accessibility'
        helperText='Used for screen readers and when image fails to load'
        required
      />

      <Input
        label='Image Caption'
        name='image.caption'
        placeholder='Optional caption for the image'
      />
    </div>
  );
};

export default ThoughtForm;
