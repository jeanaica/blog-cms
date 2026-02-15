import { type FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import useTranslation from 'hooks/useTranslation';

import useToast from 'components/toast/hook';
import Loading from 'components/loading/Loading';

import { UPDATE_THOUGHT } from './schema/mutations';
import { GET_THOUGHT_BY_ID } from './schema/queries';
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

  const handleUpdate = async (values: ThoughtInput & { tagsInput: string }, status: string) => {
    setSubmitting(true);
    try {
      const tags = prepareTags(values.tagsInput);
      const image = values.image?.url ? { url: values.image.url, caption: values.image.caption || undefined } : null;

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

  const onSubmit = async (values: ThoughtInput & { tagsInput: string }) => {
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
