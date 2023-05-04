import { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import Container from 'components/container/Container';
import Editor from 'components/form/editor/Editor';
import Alert from 'components/alert/Alert';
import useToast from 'components/toast/hook';

import validation from 'features/article/schema/validation';
import { moveImageToFolder } from 'lib/firebase/storage/upload';
import formatDate from 'shared/utils/formatDate';

import { ADD_ARTICLE } from './schema/mutations';
import { ArticleInput } from './types/ArticleInput';
import TitleMenu from './forms/TitleMenu';
import FormAccordion from './forms/FormAccordion';

const Add: FC = () => {
  const today = formatDate();
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation('common');
  const [previewUrl, setPreviewUrl] = useState('');

  const methods = useForm<ArticleInput>({
    resolver: zodResolver(validation),
    defaultValues: {
      scheduledAt: today,
      author: 'Jeanaica Suplido',
    },
  });
  const { reset, handleSubmit, getValues, watch, setValue, trigger } = methods;
  const title: string = watch('title');
  const content: string = watch('content');
  const slug: string = watch('slug');

  const [addArticle, { error }] = useMutation(ADD_ARTICLE);

  const handleArticle = async (values: ArticleInput, status: string) => {
    const {
      title,
      content,
      slug,
      description,
      banner,
      imageAlt,
      author,
      scheduledAt,
      category,
      tags,
    } = values;

    try {
      // Move the image from temp folder to the new folder and update the download URL
      const newBannerURL = await moveImageToFolder(banner);

      const meta = {
        slug,
        description,
        author,
        imageAlt,
        image: newBannerURL,
      };

      await addArticle({
        variables: {
          post: {
            title,
            content,
            banner: newBannerURL,
            scheduledAt,
            category,
            tags,
            status,
            meta,
          },
        },
      });
      reset(); // Clear the form after submission
      toast('success', t('updateSuccess'));
      router.push('/post');
    } catch (err) {
      console.error(
        `Error ${
          status === 'PUBLISHED' ? 'submitting' : 'saving'
        } the article:`,
        err
      );
    }
  };

  const onSubmit = async (values: ArticleInput) => {
    const postDate = values.scheduledAt !== today ? values.scheduledAt : null;
    const status = postDate ? 'SCHEDULED' : 'PUBLISHED';

    handleArticle({ ...values, scheduledAt: postDate }, status);
  };

  const onSave = async () => {
    const isValid = await trigger('content');

    if (isValid) {
      const values = getValues();
      handleArticle({ ...values, scheduledAt: null }, 'DRAFT');
    }
  };

  const onPreview = () => {
    if (slug && content) {
      localStorage.setItem(`preview-${slug}`, content);
    }
  };

  useEffect(() => {
    const regExChars = /[^a-zA-Z 0-9 -]/g;
    const slug =
      title && title.toLowerCase().replace(regExChars, '').replaceAll(' ', '-');

    setValue('slug', slug);
  }, [title, setValue]);

  useEffect(() => {
    const id = slug;
    setPreviewUrl(`/article/${id}/preview`);
  }, [slug, setPreviewUrl]);

  return (
    <Container className='p-4 pt-0 relative'>
      <FormProvider {...methods}>
        <Alert
          type='error'
          message={error?.message}
        />
        <TitleMenu
          previewUrl={previewUrl}
          onPreview={onPreview}
          onSave={onSave}
          onSubmit={handleSubmit(onSubmit)}
        />
        <FormAccordion />
        <Editor
          label=''
          name='content'
        />
      </FormProvider>
    </Container>
  );
};

export default Add;
