import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import useToast from 'components/toast/hook';

import validation from 'features/article/schema/validation';
import { moveImageToFolder } from 'lib/firebase/storage/upload';
import formatDate from 'utils/formatDate';

import { ADD_ARTICLE } from './schema/mutations';
import { ArticleInput } from './types/ArticleInput';
import MainForm from './forms/MainForm';

const Add: FC = () => {
  const today = formatDate();
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation('common');
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<ArticleInput>({
    resolver: zodResolver(validation),
    defaultValues: {
      scheduledAt: today,
      author: 'Jeanaica Suplido-Alinsub',
    },
  });
  const { reset, handleSubmit, getValues, trigger } = methods;

  const [addArticle, { error }] = useMutation(ADD_ARTICLE);

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
    let newBannerURL = banner;

    try {
      if (banner && status.toUpperCase() !== 'DRAFT') {
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

      await addArticle({
        variables: {
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

      setTimeout(() => {
        setSubmitting(false);
      }, 300);

      router.push('/post');
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
    const isValid = await trigger('content');

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
