import { type FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';

import useToast from 'components/toast/hook';

import validation from './schema/validation';
import uploadImage from 'lib/api/uploadImage';
import formatDate from 'utils/formatDate';

import { UPDATE_GALLERY } from './schema/mutations';
import { GET_GALLERY } from './schema/queries';
import { type GalleryInput } from './types/GalleryInput';
import { type Gallery } from './types/Gallery';
import GalleryForm from './forms/GalleryForm';

const Edit: FC = () => {
  const today = formatDate();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const { t } = useTranslation();
  const [dataStatus, setDataStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    loading,
    data,
    error: queryError,
  } = useQuery(GET_GALLERY, {
    variables: { id },
  });

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

  const [updateGallery, { error }] = useMutation(UPDATE_GALLERY);

  const formatDataForForm = useCallback(
    (gallery: Gallery): GalleryInput => {
      if (!gallery) return {} as GalleryInput;

      return {
        title: gallery.title,
        description: gallery.description,
        images: gallery.images.map((img, index) => ({
          id: `${index}`,
          url: img.url,
          alt: img.alt,
          caption: img.caption,
        })),
        status: gallery.status,
        scheduledAt:
          gallery.status === 'PUBLISHED' && gallery.publishedAt
            ? formatDate(new Date(gallery.publishedAt))
            : gallery.status === 'SCHEDULED' && gallery.scheduledAt
              ? formatDate(new Date(gallery.scheduledAt))
              : today,
      };
    },
    [today]
  );

  const handleGallery = async (values: GalleryInput, status: string) => {
    setSubmitting(true);

    const { title, description, images, scheduledAt } = values;

    try {
      // Upload new images in parallel
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

      await updateGallery({
        variables: {
          id,
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

    if (dataStatus === 'PUBLISHED') {
      handleGallery(values, dataStatus);
    } else {
      handleGallery({ ...values, scheduledAt: postDate }, status);
    }
  };

  const onSave = async () => {
    const values = getValues();

    if (dataStatus !== 'DRAFT') {
      handleSubmit(onSubmit)();
    } else {
      handleGallery({ ...values, scheduledAt: null }, 'DRAFT');
    }
  };

  useEffect(() => {
    if (data?.gallery) {
      setDataStatus(data.gallery.status);
      reset(formatDataForForm(data.gallery));
    }
  }, [data, reset, formatDataForForm]);

  return (
    <GalleryForm
      methods={methods}
      onSave={onSave}
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      submitting={submitting}
      error={error?.message || queryError?.message}
    />
  );
};

export default Edit;
