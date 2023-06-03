import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Input from 'components/form/input/Input';
import Button from 'components/button/Button';
import Shared from 'components/layout/Shared';

import { auth } from 'lib/firebase/client';
import useSessionStorage from 'hooks/useSessionStorage';
import Alert from 'components/alert/Alert';

const schema = z.object({
  email: z.string().email().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
});

const Login = () => {
  const [idToken, setIdToken] = useSessionStorage<string>('token', '');
  const [error, setError] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async data => {
    setLoading(true);
    const { email, password } = data;
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();

      setIdToken(token);

      window.location.href = '/post';
    } catch (err) {
      setIdToken('');
      setError(err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className='h-screen w-screen overflow-hidden prose min-w-[320px] flex justify-center content-center items-center'>
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
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
              className='mt-4'
              isLoading={loading}
              text='Submit'
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

Login.Layout = Shared;

export default Login;
