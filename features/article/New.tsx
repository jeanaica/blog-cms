import { FC, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Alert from 'components/alert/Alert';

import FormHeader from 'features/shared/form/FormHeader';
import FormTabs from 'features/shared/form/FormTabs';
import FormSide from 'features/shared/form/FormSide';
import schema from 'features/shared/form/schema';

import {
  publishNewArticle,
  saveDraftArticle,
} from 'lib/firebase/article/actions';
import { Article } from 'lib/firebase/article/types';
import { isToday } from 'lib/utils/dateHelpers';

const New: FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saveAsType, setSaveAsType] = useState<string>();
  const methods = useForm<Article>({
    resolver: zodResolver(schema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const onSubmit = handleSubmit(async data => {
    setError(null);
    try {
      await publishNewArticle(data);
      if (isToday(data.postDate)) {
        setSaveAsType('published');
      } else {
        setSaveAsType('scheduled');
      }
    } catch (err) {
      setError('Failed to publish article. Please try again.');
    }
  });

  const onSubmitDraft = handleSubmit(async data => {
    setError(null);
    try {
      await saveDraftArticle(data);
      setSaveAsType('drafts');
    } catch (err) {
      setError('Failed to save article. Please try again.');
    }
  });

  useEffect(() => {
    if (isSubmitSuccessful && saveAsType) {
      reset();
      router.push(`/post/${saveAsType}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, router, saveAsType]);

  return (
    <div className='flex flex-col'>
      <Alert
        type='error'
        message={error}
      />
      <FormProvider {...methods}>
        <FormHeader
          onSubmit={onSubmit}
          onSubmitDraft={onSubmitDraft}
        />
        <div className='flex mt-12 gap-12'>
          <FormTabs />
          <FormSide />
        </div>
      </FormProvider>
    </div>
  );
};

export default New;
