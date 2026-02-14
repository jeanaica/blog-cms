import { type FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import useTranslation from 'hooks/useTranslation';
import { useNavigate, useParams } from 'react-router-dom';

import useToast from 'components/toast/hook';

import validation from 'features/article/schema/validation';
import uploadImage from 'lib/api/uploadImage';
import formatDate from 'utils/formatDate';

import { UPDATE_ARTICLE } from './schema/mutations';
import { GET_ARTICLE_BY_ID } from './schema/queries';
import { type ArticleInput } from './types/ArticleInput';
import MainForm from './forms/MainForm';
import {
  uploadContentBlockImages,
  serializeBlocksForMutation,
  mapContentBlocksFromQuery,
} from './utils/serializeContentBlocks';

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
  } = useQuery(GET_ARTICLE_BY_ID, {
    variables: { id },
  });

  const methods = useForm<ArticleInput>({
    resolver: zodResolver(validation),
    defaultValues: {
      scheduledAt: today,
      author: 'Jeanaica Suplido-Alinsub',
      contentBlocks: [],
      content: '',
    },
  });

  const { reset, handleSubmit, getValues, trigger } = methods;

  const [updateArticle, { error }] = useMutation(UPDATE_ARTICLE);

  const formatDataForForm = useCallback(
    (data: any): ArticleInput => {
      if (!data) return {} as ArticleInput;

      const { meta, contentBlocks, ...restData } = data;

      return {
        ...restData,
        ...meta,
        contentBlocks: mapContentBlocksFromQuery(contentBlocks, data.content),
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
      contentBlocks,
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
      // Upload banner and content block images in parallel
      const bannerPromise =
        banner instanceof File
          ? uploadImage({ file: banner, folder: `${slug}/banner`, isBanner: true })
          : Promise.resolve(null);
      const blocksPromise = uploadContentBlockImages(contentBlocks || [], slug);

      const [bannerResult, processedBlocks] = await Promise.all([
        bannerPromise,
        blocksPromise,
      ]);

      let bannerUrl = '';
      if (bannerResult) {
        if (!bannerResult.success) {
          throw new Error(bannerResult.message);
        }
        bannerUrl = bannerResult.url!;
      } else if (banner && typeof banner === 'string') {
        bannerUrl = banner;
      }

      const serializedBlocks = serializeBlocksForMutation(processedBlocks);

      // Auto-generate content from text blocks for backward compatibility
      const content =
        processedBlocks
          .filter(b => b.type === 'text')
          .map(b => b.content || '')
          .join('') || '';

      const meta = {
        slug,
        url: `${import.meta.env.VITE_DOMAIN}/${slug}`,
        description,
        author,
        imageAlt,
        image: bannerUrl,
      };

      await updateArticle({
        variables: {
          id,
          post: {
            title,
            content,
            contentBlocks: serializedBlocks,
            banner: bannerUrl,
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
        navigate('/post');
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
    const isValid = await trigger('contentBlocks');

    if (isValid) {
      const values = getValues();

      // if status is not already in draft
      if (dataStatus !== 'DRAFT') {
        handleSubmit(onSubmit)(); // Fixed: need to invoke the returned function
      } else {
        // if it is still in draft
        handleArticle({ ...values, scheduledAt: null }, 'DRAFT');
      }
    }
  };

  useEffect(() => {
    if (data?.post) {
      setDataStatus(data.post.status);
      reset(formatDataForForm(data.post));
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
