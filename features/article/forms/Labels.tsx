import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { MultiValue } from 'react-select';
import { useFormContext } from 'react-hook-form';

import CreatablePill from 'components/form/pill/CreatablePill';
import Pill from 'components/form/pill/Pill';

import { GET_CATEGORIES, GET_TAGS } from '../schema/queries';
import { ADD_TAG } from '../schema/mutations';

const Labels = () => {
  const { setValue, setError } = useFormContext();
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useQuery(GET_CATEGORIES);

  const {
    data: tags,
    loading: loadingTags,
    error: errorTags,
    refetch: refetchTags,
  } = useQuery(GET_TAGS);

  const [addTag, { error: addTagError }] = useMutation(ADD_TAG);

  const handlePillChange = (val: MultiValue<any>) => {
    setValue('tags', val);
  };

  const handleCreatablePillChange = (val: MultiValue<any>) => {
    const categoryVal = val.filter(v => v.notRemovable);

    setValue('category', categoryVal);
  };

  const handleCreateOption = async (inputValue: string) => {
    await addTag({
      variables: {
        tag: inputValue,
      },
    });
    refetchTags();
  };

  useEffect(() => {
    if (errorCategories) {
      setError('category', errorCategories);
    }

    if (errorTags) {
      setError('tags', errorTags);
    }

    if (addTagError) {
      setError('tags', addTagError);
    }
  }, [errorCategories, errorTags, addTagError, setError]);

  useEffect(() => {
    refetchCategories();
    refetchTags();
  }, [refetchCategories, refetchTags]);

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
        onCreateOption={handleCreateOption}
        onPillChange={handleCreatablePillChange}
        hasRemovable
      />
    </>
  );
};

export default Labels;
