import { FC, useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
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

import { UPDATE_ARTICLE } from './schema/mutations';
import { ArticleInput } from './types/ArticleInput';
import TitleMenu from './forms/TitleMenu';
import FormAccordion from './forms/FormAccordion';
import { GET_ARTICLE_BY_ID } from './schema/queries';

const Edit: FC = () => {
  const today = formatDate();
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const { t } = useTranslation('common');
  const [previewUrl, setPreviewUrl] = useState('');
  const [initialBanner, setInitialBanner] = useState('');
  const [dataStatus, setDataStatus] = useState('');

  const {
    loading,
    data,
    error: queryError,
  } = useQuery(GET_ARTICLE_BY_ID, {
    variables: { id },
  });

  const methods = useForm<ArticleInput>({
    resolver: zodResolver(validation),
    defaultValues: {
      scheduledAt: today,
      author: 'Jeanaica Suplido-Alinsub',
    },
  });

  const { reset, handleSubmit, getValues, watch, setValue, trigger } = methods;
  const title: string = watch('title');
  const content: string = watch('content');
  const slug: string = watch('slug');

  const [updateArticle, { error }] = useMutation(UPDATE_ARTICLE);

  const formatDataForForm = useCallback(
    (data: any): ArticleInput => {
      if (!data) return {} as ArticleInput;

      const { meta, ...restData } = data;

      setInitialBanner(data.banner);
      setDataStatus(data.status);

      return {
        ...restData,
        ...meta,
        scheduledAt:
          data?.status === 'PUBLISHED'
            ? formatDate(data.publishedAt)
            : data?.status === 'SCHEDULED'
            ? formatDate(data.scheduledAt)
            : today,
      };
    },
    [today]
  );

  const handleArticle = async (values: ArticleInput, status: string) => {
    const {
      title,
      content,
      slug,
      description,
      banner,
      caption,
      imageAlt,
      author,
      scheduledAt,
      category,
      tags,
    } = values;

    try {
      let newBannerURL = banner;

      // Check if the banner has changed, and if in public folder
      if (
        banner !== initialBanner ||
        status.toUpperCase() !== 'DRAFT' ||
        !banner.includes('public')
      ) {
        // Move the image from temp folder to the new folder and update the download URL
        newBannerURL = await moveImageToFolder(banner, 'public');
      }

      const meta = {
        slug,
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/${slug}`,
        description,
        author,
        imageAlt,
        image: newBannerURL,
      };

      await updateArticle({
        variables: {
          id,
          post: {
            title,
            content,
            banner: newBannerURL,
            caption,
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

    // if data is already published
    if (dataStatus === 'PUBLISHED') {
      handleArticle(values, dataStatus);
    } else {
      // if data is not yet published
      handleArticle({ ...values, scheduledAt: postDate }, status);
    }
  };

  const onSave = async () => {
    const isValid = await trigger('content');

    if (isValid) {
      const values = getValues();

      // if status is not already in draft
      if (dataStatus !== 'DRAFT') {
        handleSubmit(onSubmit);
      } else {
        // if it is still in draft
        handleArticle({ ...values, scheduledAt: null }, 'DRAFT');
      }
    }
  };

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

  useEffect(() => {
    if (data?.post) {
      const formattedData = formatDataForForm(data?.post);
      reset(formattedData);
    }
  }, [data, reset, formatDataForForm]);

  return (
    <Container
      className='p-4 pt-0 relative'
      loading={loading}>
      <FormProvider {...methods}>
        <Alert
          type='error'
          message={error?.message || queryError?.message}
        />
        <TitleMenu
          status={dataStatus}
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

export default Edit;
