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
  status?: string;
};

const GalleryForm: FC<Props> = ({
  methods,
  onSave,
  onSubmit,
  loading,
  submitting,
  error,
  status,
}) => {
  const {
    formState: { isDirty, isSubmitting, errors },
  } = methods;

  return (
    <Container
      className='p-4 pt-0 relative'
      loading={loading}>
      <FormProvider {...methods}>
        {error && (
          <Alert
            type='error'
            message={error}
          />
        )}

        {/* Inline editable title header - matches post edit page style */}
        <div className='flex gap-2 sticky top-0 bg-white z-20 pt-4 mb-6'>
          <div className='flex flex-[2]'>
            <Input
              label=''
              name='title'
              className='h-full p-0 font-PoppinsSemiBold md:text-2xl'
              placeholder='Enter gallery title...'
            />
          </div>

          <div className='flex flex-1 gap-2 mb-4'>
            {status !== 'PUBLISHED' && (
              <Button
                type='button'
                onClick={onSave}
                icon='move_to_inbox'
                disabled={submitting || !isDirty}>
                Draft
              </Button>
            )}
            <Button
              onClick={onSubmit}
              primary
              icon='send'
              disabled={isSubmitting || !isDirty}>
              Publish
            </Button>
          </div>
        </div>

        <form className='space-y-6 max-w-4xl mx-auto'>
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
        </form>

        <LoadingModal isOpen={submitting} />
        <UnsavedChangesModal hasUnsavedChanges={isDirty} />
      </FormProvider>
    </Container>
  );
};

export default GalleryForm;
