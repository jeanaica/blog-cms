import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import useTranslation from 'hooks/useTranslation';

import useToast from 'components/toast/hook';

import validation from 'features/article/schema/validation';
import uploadImage from 'lib/api/uploadImage';
import formatDate from 'utils/formatDate';

import { ADD_ARTICLE } from './schema/mutations';
import { ArticleInput } from './types/ArticleInput';
import MainForm from './forms/MainForm';
import { useNavigate } from 'react-router-dom';
import {
  uploadContentBlockImages,
  serializeBlocksForMutation,
} from './utils/serializeContentBlocks';

const Add: FC = () => {
  const navigate = useNavigate();
  const today = formatDate();
  const toast = useToast();
  const { t } = useTranslation('common');
  const [submitting, setSubmitting] = useState(false);

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

  const [addArticle, { error }] = useMutation(ADD_ARTICLE);

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
      let bannerUrl = '';

      if (banner) {
        if (banner instanceof File) {
          const uploadResult = await uploadImage(banner, 'banners');
          if (!uploadResult.success) {
            throw new Error(uploadResult.message);
          }
          bannerUrl = uploadResult.url!;
        } else {
          bannerUrl = banner;
        }
      }

      // Upload content block images and serialize
      const processedBlocks = await uploadContentBlockImages(
        contentBlocks || []
      );
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

      await addArticle({
        variables: {
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

    handleArticle({ ...values, scheduledAt: postDate }, status);
  };

  const onSave = async () => {
    const isValid = await trigger('contentBlocks');

    if (isValid) {
      const values = getValues();
      handleArticle({ ...values, scheduledAt: null }, 'DRAFT');
    }
  };

  return (
    <MainForm
      methods={methods}
      onSave={onSave}
      onSubmit={handleSubmit(onSubmit)}
      submitting={submitting}
      error={error?.message}
    />
  );
};

export default Add;
