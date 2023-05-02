import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { MultiValue } from 'react-select';
import { useFormContext } from 'react-hook-form';

import CreatablePill from 'components/form/pill/CreatablePill';
import Pill from 'components/form/pill/Pill';

import { GET_CATEGORIES, GET_TAGS } from '../schema/queries';

const Labels = () => {
  const { setValue, setError } = useFormContext();
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useQuery(GET_CATEGORIES);

  const {
    data: tags,
    loading: loadingTags,
    error: errorTags,
  } = useQuery(GET_TAGS);

  const handlePillChange = (val: MultiValue<any>) => {
    setValue('tags', val);
  };

  const handleCreatablePillChange = (val: MultiValue<any>) => {
    const categoryVal = val.filter(v => v.notRemovable);

    setValue('category', categoryVal);
  };

  useEffect(() => {
    if (errorCategories) {
      setError('category', errorCategories);
    }

    if (errorTags) {
      setError('tags', errorTags);
    }
  }, [errorCategories, errorTags, setError]);

  return (
    <>
      <Pill
        label='Category'
        name='category'
        loading={loadingCategories}
        options={categories?.categories}
        onPillChange={handlePillChange}
      />
      <CreatablePill
        label='Tags'
        name='tags'
        loading={loadingTags}
        options={tags?.tags}
        onPillChange={handleCreatablePillChange}
        hasRemovable
      />
    </>
  );
};

export default Labels;
