import { FC, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Alert from 'components/alert/Alert';
import Loading from 'components/loading/Loading';

import FormHeader from 'features/shared/form/FormHeader';
import FormTabs from 'features/shared/form/FormTabs';
import FormSide from 'features/shared/form/FormSide';
import schema from 'features/shared/form/schema';

import { updateArticle } from 'lib/firebase/article/actions';
import { getArticle } from 'lib/firebase/article/get';

import { ArticleForm } from './shared/types';
import { getTodayFormValue } from 'lib/utils/dateConverter';
import { ArticleTypes } from 'lib/firebase/article/types';

const Edit: FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [publishedDate, setPublishedDate] = useState<string | undefined>();
  const [showButtons, setShowButtons] = useState<{
    isDraft?: boolean;
    isScheduled?: boolean;
    isPublished?: boolean;
    isUnpublished?: boolean;
  }>({
    isDraft: false,
    isPublished: false,
    isScheduled: false,
    isUnpublished: false,
  });

  const {
    query: { id },
  } = router as unknown as {
    query: {
      id: string;
    };
  };

  const methods = useForm<ArticleForm>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldUnregister: true,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    fetchFields();
  }, [id]);

  const fetchFields = async () => {
    try {
      const article = await getArticle(id);

      if (article.isDraft) {
        article.postDate = new Date().toISOString().slice(0, 10);
      }

      setShowButtons({
        isDraft: article.isDraft,
        isPublished: article.isPublished,
        isScheduled: article.isScheduled,
        isUnpublished: article.isUnpublished,
      });

      setPublishedDate(article.publishedDate);

      reset({
        ...article,
        postDate: article?.postDate ? article?.postDate : getTodayFormValue(),
      });
    } catch (error) {
      console.error(error);

      setError('Failed to fetch article. Please try again.');
    }
  };

  const onSubmit = (type: ArticleTypes) => {
    handleSubmit(async data => {
      try {
        if (type === ArticleTypes.isPublished) {
          data.postDate = null;
        }

        await updateArticle({
          article: {
            ...data,
            publishedDate,
          },
          id,
          type,
        });

        reset();

        handleOnSuccess(type);
      } catch (err) {
        console.log(err);

        setError('Failed to publish article. Please try again.');
      }
    })();
  };

  const handleOnSuccess = (type: ArticleTypes) => {
    let route = '';
    switch (type) {
      case ArticleTypes.isDraft:
        route = 'drafts';
        break;

      case ArticleTypes.isPublished:
        route = 'published';
        break;

      case ArticleTypes.isScheduled:
        route = 'scheduled';
        break;

      case ArticleTypes.isUnpublished:
        route = 'unpublished';
        break;

      default:
        break;
    }

    router.push(`/post/${route}`);
  };

  return (
    <div className='flex flex-col'>
      <Alert
        type='error'
        message={error}
      />
      {!isSubmitting ? (
        <FormProvider {...methods}>
          <FormHeader
            onSubmit={onSubmit}
            showButtons={showButtons}
          />
          <div className='flex mt-8 gap-12'>
            <FormTabs />
            <FormSide />
          </div>
        </FormProvider>
      ) : (
        <div className='flex justify-center p-12 flex-col items-center'>
          <Loading className='text-gray-500' />
          <span className='text-gray-500'>Submitting... </span>
        </div>
      )}
    </div>
  );
};

export default Edit;
