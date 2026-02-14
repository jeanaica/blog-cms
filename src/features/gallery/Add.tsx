import { type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';

import useToast from 'components/toast/hook';

import validation from './schema/validation';
import uploadImage from 'lib/api/uploadImage';
import formatDate from 'utils/formatDate';

import { CREATE_GALLERY } from './schema/mutations';
import { type GalleryInput } from './types/GalleryInput';
import GalleryForm from './forms/GalleryForm';

const Add: FC = () => {
  const navigate = useNavigate();
  const today = formatDate();
  const toast = useToast();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

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

  const { reset, handleSubmit, getValues } = methods;

  const [createGallery, { error }] = useMutation(CREATE_GALLERY);

  const handleGallery = async (values: GalleryInput, status: string) => {
    setSubmitting(true);

    const { title, description, images, scheduledAt } = values;

    try {
      // Upload all images in parallel
      const uploadPromises = images.map(async (item, index) => {
        if (item.file) {
          const result = await uploadImage({
            file: item.file,
            folder: `galleries/${title.toLowerCase().replace(/\s+/g, '-')}`,
          });

          if (!result.success) {
            throw new Error(result.message);
          }

          return {
            url: result.url!,
            alt: item.alt || '',
            caption: item.caption || '',
            order: index,
          };
        } else if (item.url) {
          return {
            url: item.url,
            alt: item.alt || '',
            caption: item.caption || '',
            order: index,
          };
        }
        throw new Error('Invalid image data');
      });

      const uploadedImages = await Promise.all(uploadPromises);

      await createGallery({
        variables: {
          gallery: {
            title,
            description,
            images: uploadedImages,
            status,
            scheduledAt: status === 'SCHEDULED' ? scheduledAt : null,
          },
        },
      });

      toast('success', t('updateSuccess'));

      reset({}, { keepValues: true, keepDirty: false });

      setTimeout(() => {
        setSubmitting(false);
        navigate('/galleries');
      }, 300);
    } catch (err) {
      setTimeout(() => {
        setSubmitting(false);
      }, 300);

      console.error(`Error ${status === 'PUBLISHED' ? 'publishing' : 'saving'} the gallery:`, err);
      toast('error', t('updateFail'));
    }
  };

  const onSubmit = async (values: GalleryInput) => {
    const postDate = values.scheduledAt !== today ? values.scheduledAt : null;
    const status = postDate ? 'SCHEDULED' : 'PUBLISHED';

    handleGallery({ ...values, scheduledAt: postDate }, status);
  };

  const onSave = async () => {
    const values = getValues();
    handleGallery({ ...values, scheduledAt: null }, 'DRAFT');
  };

  return (
    <GalleryForm
      methods={methods}
      onSave={onSave}
      onSubmit={handleSubmit(onSubmit)}
      submitting={submitting}
      error={error?.message}
    />
  );
};

export default Add;
