import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import FormHeader from 'features/shared/form/FormHeader';
import FormTabs from 'features/shared/form/FormTabs';
import FormSide from 'features/shared/form/FormSide';
import schema from 'features/shared/form/schema';

const Edit: FC = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: 'Sample',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async data => {
    console.log('DATA', data);

    try {
      // NOOP
    } catch (error) {
      // NOOP
    }
  });

  return (
    <div className='flex flex-col'>
      <FormProvider {...methods}>
        <FormHeader onSubmit={onSubmit} />

        <div className='flex mt-12 gap-12'>
          <FormTabs />
          <FormSide />
        </div>
      </FormProvider>
    </div>
  );
};

export default Edit;
