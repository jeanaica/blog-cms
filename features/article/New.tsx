import { FC, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Alert from 'components/alert/Alert';
import Loading from 'components/loading/Loading';

import FormHeader from 'features/shared/form/FormHeader';
import FormTabs from 'features/shared/form/FormTabs';
import FormSide from 'features/shared/form/FormSide';
import schema from 'features/shared/form/schema';

import { saveArticle } from 'lib/firebase/article/actions';
import { ArticleTypes } from 'lib/firebase/article/types';

import { ArticleForm } from './shared/types';

const New: FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const methods = useForm<ArticleForm>({
    resolver: zodResolver(schema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (type: ArticleTypes) => {
    handleSubmit(async data => {
      try {
        await saveArticle({
          article: data,
          type,
        });

        reset();
        handleOnSuccess(type);
      } catch (err) {
        console.log(err);

        setError('Failed to save article. Please try again.');
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
            showButtons={{
              isDraft: true,
              isPublished: false,
              isScheduled: false,
              isUnpublished: false,
            }}
          />
          <div className='flex mt-8 gap-12 h-[620px]'>
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

export default New;
