import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import Button from 'components/button/Button';
import TextArea from 'components/form/TextArea';
import Input from 'components/form/Input';
import DatePicker from 'components/form/DatePicker';

import { type ThoughtInput } from '../types';

type Props = {
  onSubmit: () => void;
  onSave: () => void;
  submitting?: boolean;
  isEdit?: boolean;
};

const ThoughtForm: FC<Props> = ({ onSubmit, onSave, submitting, isEdit }) => {
  const { register, watch } = useFormContext<ThoughtInput>();

  const status = watch('status');

  return (
    <div className='max-w-2xl mx-auto p-8'>
      <div className='flex justify-between items-center mb-8 sticky top-0 bg-slate-50 py-4 z-10'>
        <h1 className='text-2xl font-semibold'>
          {isEdit ? 'Edit Thought' : 'New Thought'}
        </h1>
        <div className='flex gap-2'>
          <Button
            text='Save Draft'
            onClick={onSave}
            disabled={submitting}
          />
          <Button
            text='Publish'
            primary
            onClick={onSubmit}
            isLoading={submitting}
          />
        </div>
      </div>

      <TextArea
        label='Text'
        name='text'
        rows={4}
        placeholder='What&apos;s on your mind?'
        isSubmitting={submitting}
      />

      <div className='flex items-center gap-4 mb-4'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='checkbox'
            {...register('isQuote')}
            className='w-4 h-4 rounded border-gray-300'
          />
          <span className='text-sm font-medium text-gray-700'>This is a quote</span>
        </label>
      </div>

      <Input
        label='Tags'
        name='tagsInput'
        placeholder='Comma-separated tags (e.g., coding, life, design)'
        helperText='Separate tags with commas'
      />

      <Input
        label='Image URL'
        name='image.url'
        placeholder='https://example.com/image.jpg'
      />

      <Input
        label='Image Caption'
        name='image.caption'
        placeholder='Optional caption for the image'
      />

      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
        <select
          {...register('status')}
          className='border-b border-b-gray-300 w-full py-2 outline-none focus:ring-0'
          disabled={submitting}>
          <option value='draft'>Draft</option>
          <option value='published'>Published</option>
          <option value='scheduled'>Scheduled</option>
        </select>
      </div>

      {status === 'scheduled' && (
        <DatePicker
          label='Publish Date'
          name='publishDate'
          minDate={new Date()}
        />
      )}
    </div>
  );
};

export default ThoughtForm;
