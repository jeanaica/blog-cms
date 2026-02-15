import { type FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';

import useToast from 'components/toast/hook';

import { ADD_THOUGHT } from './schema/mutations';
import { type ThoughtInput } from './types';
import ThoughtForm from './components/ThoughtForm';

const Add: FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<ThoughtInput & { tagsInput: string }>({
    defaultValues: {
      text: '',
      isQuote: false,
      status: 'draft',
      tags: [],
      tagsInput: '',
      image: null,
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

  const prepareInput = (values: ThoughtInput & { tagsInput: string }, status: string) => {
    const tags = prepareTags(values.tagsInput);
    const image = values.image?.url ? { url: values.image.url, caption: values.image.caption || undefined } : null;

    return {
      text: values.text,
      isQuote: values.isQuote,
      status,
      tags,
      image,
      publishDate: status === 'scheduled' ? values.publishDate : null,
    };
  };

  const handleCreate = async (values: ThoughtInput & { tagsInput: string }, status: string) => {
    setSubmitting(true);
    try {
      const input = prepareInput(values, status);
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

  const onSubmit = async (values: ThoughtInput & { tagsInput: string }) => {
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
