import { type FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';

import useToast from 'components/toast/hook';
import Loading from 'components/loading/Loading';
import uploadImage from 'lib/api/uploadImage';

import { UPDATE_THOUGHT } from './schema/mutations';
import { GET_THOUGHT_BY_ID } from './schema/queries';
import validation from './schema/validation';
import { type ThoughtInput } from './types';
import ThoughtForm from './components/ThoughtForm';

const Edit: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  const { loading, data } = useQuery(GET_THOUGHT_BY_ID, {
    variables: { id },
  });

  const methods = useForm<ThoughtInput & { tagsInput: string; imageFile?: File | string | null }>({
    resolver: zodResolver(validation),
    defaultValues: {
      text: '',
      isQuote: false,
      status: 'draft',
      tags: [],
      tagsInput: '',
      image: null,
      imageFile: null,
      publishDate: null,
    },
  });

  const { handleSubmit, getValues, reset } = methods;

  const [updateThought] = useMutation(UPDATE_THOUGHT);

  useEffect(() => {
    if (data?.thought) {
      const thought = data.thought;
      reset({
        text: thought.text,
        isQuote: thought.isQuote,
        status: thought.status,
        tags: thought.tags || [],
        tagsInput: (thought.tags || []).join(', '),
        image: thought.image || null,
        imageFile: thought.image?.url || null,
        publishDate: thought.publishDate
          ? new Date(thought.publishDate).toISOString().split('T')[0]
          : null,
      });
    }
  }, [data, reset]);

  const prepareTags = (tagsInput: string): string[] => {
    return tagsInput
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
  };

  const handleUpdate = async (
    values: ThoughtInput & { tagsInput: string; imageFile?: File | string | null },
    status: string
  ) => {
    setSubmitting(true);
    try {
      const tags = prepareTags(values.tagsInput);

      let image = null;

      // If there's a new file to upload
      if (values.imageFile instanceof File) {
        // Use a date-based folder structure: thoughts/YYYY-MM
        const now = new Date();
        const folder = `thoughts/${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const uploadResult = await uploadImage({ file: values.imageFile, folder });
        if (uploadResult.success && uploadResult.url) {
          image = {
            url: uploadResult.url,
            alt: values.image?.alt || '',
            caption: values.image?.caption || undefined,
          };
        } else {
          console.error('Upload failed:', uploadResult.message);
          throw new Error(`Image upload failed: ${uploadResult.message}`);
        }
      }
      // If there's an existing image URL
      else if (values.image?.url) {
        image = {
          url: values.image.url,
          alt: values.image.alt || '',
          caption: values.image.caption || undefined,
        };
      }

      const input = {
        text: values.text,
        isQuote: values.isQuote,
        status,
        tags,
        image,
        publishDate: status === 'scheduled' ? values.publishDate : null,
      };

      await updateThought({ variables: { id, input } });
      toast('success', t('updateSuccess'));
      setTimeout(() => {
        setSubmitting(false);
        navigate('/thought');
      }, 300);
    } catch (err) {
      setSubmitting(false);
      console.error('Error updating thought:', err);
      toast('error', t('updateFail'));
    }
  };

  const onSubmit = async (values: ThoughtInput & { tagsInput: string; imageFile?: File | string | null }) => {
    const status = values.status === 'scheduled' ? 'scheduled' : 'published';
    handleUpdate(values, status);
  };

  const onSave = () => {
    const values = getValues();
    handleUpdate(values, 'draft');
  };

  if (loading) {
    return (
      <div className='flex justify-center p-12'>
        <Loading text='Loading...' />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <ThoughtForm
        onSubmit={handleSubmit(onSubmit)}
        onSave={onSave}
        submitting={submitting}
        isEdit
      />
    </FormProvider>
  );
};

export default Edit;
