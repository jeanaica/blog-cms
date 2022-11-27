import { FC } from 'react';

import Input from 'components/form/input/Input';

import DatePicker from 'components/form/datePicker/DatePicker';
import Pill from 'components/form/pill/Pill';
import CreatablePill from 'components/form/pill/CreatablePill';

const FormSide: FC = () => {
  return (
    <form className='flex-1 mt-8'>
      <Input
        label='Author'
        name='author'
        defaultValue='Jeanaica Suplido'
      />
      <DatePicker
        label='Post Date'
        name='postDate'
      />
      <Pill
        label='Category'
        name='category'
        options={[
          {
            label: 'Pink',
            value: 'pink',
          },
          {
            label: 'Peach',
            value: 'peach',
          },
        ]}
      />
      <CreatablePill
        label='Tags'
        name='tags'
        options={[
          {
            label: 'Pink',
            value: 'pink',
          },
          {
            label: 'Peach',
            value: 'peach',
          },
        ]}
      />
    </form>
  );
};

export default FormSide;
