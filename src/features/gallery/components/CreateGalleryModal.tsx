import { type FC, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from 'components/button/Button';
import Input from 'components/form/Input';
import TextArea from 'components/form/TextArea';
import Alert from 'components/alert/Alert';

import { CREATE_GALLERY } from '../schema/mutations';
import { GET_GALLERIES } from '../schema/queries';
import validation from '../schema/validation';
import { type GalleryInput } from '../types/GalleryInput';
import { type Gallery } from '../types/Gallery';
import ImageUploader from './ImageUploader';
import uploadImages from 'lib/api/uploadImages';
import formatDate from 'utils/formatDate';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onGalleryCreated: (gallery: Gallery) => void;
};

const CreateGalleryModal: FC<Props> = ({ isOpen, onClose, onGalleryCreated }) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const today = formatDate();

  const methods = useForm<GalleryInput>({
    resolver: zodResolver(validation),
    defaultValues: {
      title: '',
      description: '',
      images: [],
      status: 'DRAFT',
      scheduledAt: today,
    },
  });

  const { handleSubmit, reset, formState: { errors } } = methods;

  const [createGallery] = useMutation(CREATE_GALLERY, {
    refetchQueries: [{ query: GET_GALLERIES }],
    awaitRefetchQueries: false, // Allow refetch to happen in background for better UX
  });

  const onSubmit = async (values: GalleryInput) => {
    setSubmitting(true);
    setError(null);

    const { title, description, images } = values;

    try {
      console.log('Starting gallery creation...', { title, imageCount: images.length });

      // Separate files to upload and existing URLs
      const filesToUpload: File[] = [];
      const fileIndices: number[] = [];
      const imageMetadata = images.map((img, idx) => ({
        alt: img.alt || '',
        caption: img.caption || '',
        order: idx,
        url: img.url, // For existing URLs
      }));

      images.forEach((item, idx) => {
        if (item.file) {
          filesToUpload.push(item.file);
          fileIndices.push(idx);
        }
      });

      console.log(`Uploading ${filesToUpload.length} images...`);

      // Upload all files in a single batch request
      const galleryFolder = `galleries/${title.toLowerCase().replace(/\s+/g, '-')}`;
      const result = await uploadImages({
        files: filesToUpload,
        folder: galleryFolder,
      });

      if (!result.success) {
        console.error('Image upload failed:', result.message);
        throw new Error(result.message || 'Image upload failed');
      }

      console.log('Images uploaded successfully:', result.urls);

      // Map uploaded URLs back to their respective images
      const uploadedImages = imageMetadata.map((metadata, idx) => {
        const fileIndex = fileIndices.indexOf(idx);
        if (fileIndex !== -1) {
          // This image was uploaded, use the new URL
          return {
            ...metadata,
            url: result.urls[fileIndex],
          };
        }
        // This image already had a URL
        return metadata;
      });

      console.log('Final images array:', uploadedImages);

      console.log('Creating gallery via GraphQL mutation...');
      const { data } = await createGallery({
        variables: {
          gallery: {
            title,
            description,
            images: uploadedImages,
            status: 'DRAFT',
            scheduledAt: null,
          },
        },
      });

      if (data?.createGallery) {
        console.log('Gallery created successfully:', data.createGallery);

        // Reset form and close modal
        reset();
        onClose();

        // Small delay to ensure the gallery is available in the list
        setTimeout(() => {
          onGalleryCreated(data.createGallery);
        }, 100);
      } else {
        throw new Error('No data returned from createGallery mutation');
      }
    } catch (err) {
      console.error('Error creating gallery:', err);
      setError(err instanceof Error ? err.message : 'Failed to create gallery');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      reset();
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm'
      onClick={handleClose}>
      <div
        className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}>
        <div className='sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b rounded-t-lg'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Create New Gallery</h2>
            <button
              type='button'
              onClick={handleClose}
              disabled={submitting}
              className='text-gray-400 hover:text-gray-600 text-2xl leading-none disabled:opacity-50'>
              ×
            </button>
          </div>
        </div>

        <div className='p-6'>
          {error && (
            <Alert type='error' message={error} />
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <Input
                label='Title'
                name='title'
                placeholder='Enter gallery title'
                disabled={submitting}
              />

              <TextArea
                label='Description'
                name='description'
                placeholder='Optional description for this gallery'
                rows={3}
                disabled={submitting}
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

              <div className='flex gap-2 justify-end pt-4 border-t'>
                <Button
                  type='button'
                  onClick={handleClose}
                  disabled={submitting}
                  className='whitespace-nowrap'>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  primary
                  disabled={submitting}
                  className='whitespace-nowrap'>
                  {submitting ? 'Creating...' : 'Create Gallery'}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default CreateGalleryModal;
