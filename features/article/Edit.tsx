import { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import useToast from 'components/toast/hook';

import validation from 'features/article/schema/validation';
import { moveImageToFolder } from 'lib/firebase/storage/upload';
import formatDate from 'utils/formatDate';

import { UPDATE_ARTICLE } from './schema/mutations';
import { GET_ARTICLE_BY_ID } from './schema/queries';
import { ArticleInput } from './types/ArticleInput';
import MainForm from './forms/MainForm';

const Edit: FC = () => {
  const today = formatDate();
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();
  const { t } = useTranslation('common');
  const [initialBanner, setInitialBanner] = useState('');
  const [dataStatus, setDataStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const { reset, handleSubmit, getValues, trigger } = methods;

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
    setSubmitting(true);
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

      // Check if the status is not 'DRAFT' and the banner is not in 'public' folder
      if (
        !!newBannerURL &&
        status.toUpperCase() !== 'DRAFT' &&
        !newBannerURL.includes('public')
      ) {
        // If the banner has changed or if it's the initial banner and not yet in the public folder
        if (
          banner !== initialBanner ||
          (banner === initialBanner && !newBannerURL.includes('public'))
        ) {
          // Move the image from temp folder to the new folder and update the download URL
          newBannerURL = await moveImageToFolder(banner, 'public');
        }
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
      toast('success', t('updateSuccess'));

      reset({}, { keepValues: true, keepDirty: false });
      setTimeout(() => {
        setSubmitting(false);
        router.push('/post');
      }, 300);
    } catch (err) {
      setTimeout(() => {
        setSubmitting(false);
      }, 300);

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

  useEffect(() => {
    if (data?.post) {
      const formattedData = formatDataForForm(data?.post);
      reset(formattedData);
    }
  }, [data, reset, formatDataForForm]);

  return (
    <MainForm
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
