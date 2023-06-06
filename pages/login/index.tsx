import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Input from 'components/form/Input';
import Button from 'components/button/Button';
import Shared from 'components/layout/Shared';
import Alert from 'components/Alert';

import { auth } from 'lib/firebase/client';
import useSessionStorage from 'hooks/useSessionStorage';
import useTranslation from 'next-translate/useTranslation';

const schema = z.object({
  email: z.string().email().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
});

type LoginInput = {
  email: string;
  password: string;
};

const Login = () => {
  const [idToken, setIdToken] = useSessionStorage<string>('token', '');
  const [error, setError] = useState<any>('');
  const { t } = useTranslation('common');

  const methods = useForm<LoginInput>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isValidating, isSubmitting },
  } = methods;

  const onSubmit = async ({ email, password }: LoginInput) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();

      setIdToken(token);

      window.location.href = '/post';
    } catch (err) {
      setIdToken('');
      setError(err);
    }
  };

  useEffect(() => {
    if (isValidating) {
      setError('');
    }
  }, [isValidating]);

  return (
    <div className='h-screen w-screen overflow-hidden prose min-w-[320px] flex justify-center content-center items-center'>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full sm:max-w-md rounded overflow-hidden sm:shadow-lg shadow-accent-500 p-10 flex flex-col lg:max-w-1/2 lg:p-10'>
          <Alert
            type='error'
            message={error?.message}
          />
          <div className='flex gap-4 flex-col'>
            <Input
              label='Email'
              name='email'
            />
            <Input
              label='Password'
              name='password'
              type='password'
            />
            <Button
              type='submit'
              primary
              className='mt-4 text-xl'
              isLoading={isSubmitting}
              text={t('submit')}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

Login.Layout = Shared;

export default Login;
