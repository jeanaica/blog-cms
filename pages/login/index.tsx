import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Input from 'components/form/input/Input';
import Button from 'components/button/Button';
import Shared from 'components/layout/Shared';
import publicRoute from 'lib/routes/publicRoute';

const schema = z.object({
  email: z.string().email().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
});

const Login = () => {
  const auth = getAuth();

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async data => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = '/';
    } catch (error) {
      // NOOP
    }
  });

  return (
    <div className='h-screen w-screen overflow-hidden prose min-w-[320px] flex justify-center content-center items-center'>
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className='w-full sm:max-w-md rounded overflow-hidden sm:shadow-lg shadow-accent-500 p-10 flex flex-col lg:max-w-1/2 lg:p-10'>
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
              large
              className='mt-4'>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

Login.Layout = Shared;

export default Login;

export const getServerSideProps = publicRoute();
