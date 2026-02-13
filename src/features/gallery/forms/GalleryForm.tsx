import { type FC } from 'react';
import { FormProvider, type UseFormReturn } from 'react-hook-form';

import Container from 'components/container/Container';
import Alert from 'components/alert/Alert';
import Button from 'components/button/Button';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import DatePicker from 'components/form/DatePicker';
import LoadingModal from 'components/form/LoadingModal';
import UnsavedChangesModal from 'components/form/UnsavedChangesModal';

import { type GalleryInput } from '../types/GalleryInput';
import ImageUploader from '../components/ImageUploader';

type Props = {
  methods: UseFormReturn<GalleryInput, any>;
  onSave(): void;
  onSubmit(): void;
  loading?: boolean;
  submitting?: boolean;
  error?: string;
};

const GalleryForm: FC<Props> = ({
  methods,
  onSave,
  onSubmit,
  loading,
  submitting,
  error,
}) => {
  const {
    watch,
    formState: { isDirty, errors },
  } = methods;

  return (
    <Container
      className='p-4 pt-0 relative'
      loading={loading}>
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className='space-y-6'>
          <div className='sticky top-0 z-10 bg-slate-50 pt-8 pb-4 border-b border-slate-200'>
            <div className='flex justify-between items-center gap-4'>
              <h1 className='text-2xl font-PoppinsSemiBold'>
                {methods.getValues('title') || 'New Gallery'}
              </h1>
              <div className='flex gap-2'>
                <Button
                  type='button'
                  onClick={onSave}
                  disabled={submitting || !isDirty}>
                  Save Draft
                </Button>
                <Button
                  type='submit'
                  primary
                  disabled={submitting}>
                  {submitting ? 'Publishing...' : 'Publish'}
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <Alert
              type='error'
              message={error}
            />
          )}

          <div className='space-y-6 max-w-4xl mx-auto'>
            <Input
              label='Title'
              name='title'
              placeholder='Enter gallery title'
            />

            <TextArea
              label='Description'
              name='description'
              placeholder='Optional description for this gallery'
              rows={3}
            />

            <div>
              <label className='block text-sm font-medium mb-2'>Images</label>
              <ImageUploader
                name='images'
                disabled={submitting}
              />
              {errors.images?.message && typeof errors.images.message === 'string' && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.images.message}
                </p>
              )}
            </div>

            <DatePicker
              label='Publish Date'
              name='scheduledAt'
              helperText='Leave as today to publish immediately, or set a future date to schedule'
            />
          </div>
        </form>

        <LoadingModal isOpen={submitting} />
        <UnsavedChangesModal hasUnsavedChanges={isDirty} />
      </FormProvider>
    </Container>
  );
};

export default GalleryForm;
