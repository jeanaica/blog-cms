import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import useTranslation from 'next-translate/useTranslation';

import Container from 'components/container/Container';
import Editor from 'components/form/editor/Editor';
import Alert from 'components/alert/Alert';
import useToast from 'components/toast/hook';

import schema from 'features/article/schema';
import formatDate from 'shared/utils/formatDate';

import { ADD_ARTICLE } from './schema/mutations';
import { ArticleInput } from './types/ArticleInput';
import TitleMenu from './forms/TitleMenu';
import FormAccordion from './forms/FormAccordion';
import { useRouter } from 'next/router';

const Add: FC = () => {
  const today = formatDate();
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation('common');

  const methods = useForm<ArticleInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      postDate: today,
      author: 'Jeanaica Suplido',
    },
  });

  const { reset, handleSubmit } = methods;

  const [addArticle, { error }] = useMutation(ADD_ARTICLE);

  const handleArticle = async (values: ArticleInput, status: string) => {
    try {
      await addArticle({ variables: { ...values, status } });
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
    handleArticle({ ...values, postDate: today }, 'PUBLISHED');
  };

  const onSave = async (values: ArticleInput) => {
    const status = values.postDate !== today ? 'SCHEDULED' : 'DRAFT';

    handleArticle(values, status);
  };

  return (
    <Container className='p-4 pt-0 relative'>
      <FormProvider {...methods}>
        <Alert
          type='error'
          message={error?.message}
        />
        <TitleMenu
          onSave={handleSubmit(onSave)}
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
