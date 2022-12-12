import { FC, useEffect, useState } from 'react';

import Input from 'components/form/input/Input';
import DatePicker from 'components/form/datePicker/DatePicker';
import Pill from 'components/form/pill/Pill';
import CreatablePill from 'components/form/pill/CreatablePill';

import { Categories, Tags } from 'lib/firebase/article/types';
import { getCategories, getTags } from 'lib/firebase/article/get';

const FormSide: FC = () => {
  const [categories, setCategories] = useState<Categories>();
  const [tags, setTags] = useState<Tags>();

  useEffect(() => {
    handleOptions();
  }, []);

  const handleOptions = async () => {
    try {
      const categoriesValues = await getCategories();

      const tagsValues = await getTags();

      setCategories(categoriesValues);
      setTags(tagsValues);
    } catch (error) {
      // NOOP
    }
  };

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
        options={categories}
      />
      <CreatablePill
        label='Tags'
        name='tags'
        options={tags}
      />
    </form>
  );
};

export default FormSide;
