import { type FC } from 'react';
import { FormProvider, type UseFormReturn } from 'react-hook-form';

import Container from 'components/container/Container';
import Alert from 'components/alert/Alert';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import LoadingModal from 'components/form/LoadingModal';
import UnsavedChangesModal from 'components/form/UnsavedChangesModal';
import Button from 'components/button/Button';

import ImageUploader from '../components/ImageUploader';
import { type GalleryInput } from '../types/GalleryInput';

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
    formState: { isDirty },
  } = methods;

  return (
    <Container
      className='p-4 pt-0 relative'
      loading={loading}>
      <FormProvider {...methods}>
        <Alert
          type='error'
          message={error}
        />

        <div className='sticky top-0 bg-slate-50 z-20 pt-8 pb-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>Gallery</h1>
            <div className='flex gap-2'>
              <Button
                onClick={onSave}
                                disabled={submitting}>
                Save as Draft
              </Button>
              <Button
                onClick={onSubmit}
                primary
                disabled={submitting}>
                Publish
              </Button>
            </div>
          </div>
        </div>

        <div className='px-1 space-y-6'>
          <Input
            label='Title'
            name='title'
            placeholder='Enter gallery title'
            rules={{ required: 'Title is required' }}
          />

          <TextArea
            label='Description (optional)'
            name='description'
            placeholder='Enter gallery description'
            rows={3}
          />

          <div className='w-full'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Images
            </label>
            <ImageUploader name='images' />
          </div>
        </div>

        <LoadingModal isOpen={submitting} />
        <UnsavedChangesModal hasUnsavedChanges={isDirty} />
      </FormProvider>
    </Container>
  );
};

export default GalleryForm;
