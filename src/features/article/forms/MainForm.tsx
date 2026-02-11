import { FC, useEffect, useState } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import Container from 'components/container/Container';
import Alert from 'components/alert/Alert';
import Editor from 'components/form/Editor';
import LoadingModal from 'components/form/LoadingModal';
import UnsavedChangesModal from 'components/form/UnsavedChangesModal';

import TitleMenu from './TitleMenu';
import FormAccordion from './FormAccordion';
import { ArticleInput } from '../types/ArticleInput';

type Props = {
  methods: UseFormReturn<ArticleInput, any>;
  onSave(): void;
  onSubmit(): void;
  loading?: boolean;
  submitting?: boolean;
  error?: string;
};

const MainForm: FC<Props> = ({
  methods,
  onSave,
  onSubmit,
  loading,
  submitting,
  error,
}) => {
  const [previewUrl, setPreviewUrl] = useState('');

  const {
    watch,
    setValue,
    formState: { isDirty, isSubmitted },
  } = methods;

  const title: string = watch('title');
  const content: string = watch('content');
  const slug: string = watch('slug');
  const status: string | undefined = watch('status');

  const onPreview = () => {
    if (slug && content) {
      localStorage.setItem(`preview-${slug}`, content);
    }
  };

  useEffect(() => {
    const regExChars = /[^a-zA-Z0-9 -]/g;
    const trimmedTitle = title && title.trim();
    const slug =
      trimmedTitle &&
      trimmedTitle.toLowerCase().replace(regExChars, '').replaceAll(' ', '-');

    setValue('slug', slug);
  }, [title, setValue]);

  useEffect(() => {
    const id = slug;
    setPreviewUrl(`/article/${id}/preview`);
  }, [slug, setPreviewUrl]);

  return (
    <Container
      className='p-4 pt-0 relative'
      loading={loading}>
      <FormProvider {...methods}>
        <Alert
          type='error'
          message={error}
        />
        <TitleMenu
          status={status}
          previewUrl={previewUrl}
          onPreview={onPreview}
          onSave={onSave}
          onSubmit={onSubmit}
        />
        <FormAccordion />
        <Editor
          label=''
          name='content'
        />
        <LoadingModal isOpen={submitting || (submitting && isSubmitted)} />
        <UnsavedChangesModal hasUnsavedChanges={isDirty} />
      </FormProvider>
    </Container>
  );
};

export default MainForm;
