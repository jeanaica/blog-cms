import { type FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';

import useToast from 'components/toast/hook';
import uploadImage from 'lib/api/uploadImage';

import { ADD_THOUGHT } from './schema/mutations';
import validation from './schema/validation';
import { type ThoughtInput } from './types';
import ThoughtForm from './components/ThoughtForm';

const Add: FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

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

  const { handleSubmit, getValues } = methods;

  const [addThought] = useMutation(ADD_THOUGHT);

  const prepareTags = (tagsInput: string): string[] => {
    return tagsInput
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
  };

  const prepareInput = async (
    values: ThoughtInput & { tagsInput: string; imageFile?: File | string | null },
    status: string
  ) => {
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
    // If there's an existing image URL (for edits)
    else if (values.image?.url) {
      image = {
        url: values.image.url,
        alt: values.image.alt || '',
        caption: values.image.caption || undefined,
      };
    }

    return {
      text: values.text,
      isQuote: values.isQuote,
      status,
      tags,
      image,
      publishDate: status === 'scheduled' ? values.publishDate : null,
    };
  };

  const handleCreate = async (
    values: ThoughtInput & { tagsInput: string; imageFile?: File | string | null },
    status: string
  ) => {
    setSubmitting(true);
    try {
      const input = await prepareInput(values, status);
      await addThought({ variables: { input } });
      toast('success', t('updateSuccess'));
      setTimeout(() => {
        setSubmitting(false);
        navigate('/thought');
      }, 300);
    } catch (err) {
      setSubmitting(false);
      console.error('Error creating thought:', err);
      toast('error', t('updateFail'));
    }
  };

  const onSubmit = async (values: ThoughtInput & { tagsInput: string; imageFile?: File | string | null }) => {
    const status = values.status === 'scheduled' ? 'scheduled' : 'published';
    handleCreate(values, status);
  };

  const onSave = () => {
    const values = getValues();
    handleCreate(values, 'draft');
  };

  return (
    <FormProvider {...methods}>
      <ThoughtForm
        onSubmit={handleSubmit(onSubmit)}
        onSave={onSave}
        submitting={submitting}
      />
    </FormProvider>
  );
};

export default Add;
