import { useMutation, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { MultiValue } from 'react-select';
import { useFormContext } from 'react-hook-form';

import CreatablePill from 'components/form/pill/CreatablePill';
import Pill from 'components/form/pill/Pill';

import { GET_CATEGORIES, GET_TAGS } from '../schema/queries';
import { ADD_TAG } from '../schema/mutations';
import { Option, Options } from '../types/Option';

const Labels = () => {
  const { setValue, setError, watch } = useFormContext();
  const currentCategory: Options = watch('category');
  const currentTags: Options = watch('tags');

  const {
    data: categoryData,
    loading: loadingCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useQuery(GET_CATEGORIES);

  const {
    data: tagData,
    loading: loadingTags,
    error: errorTags,
    refetch: refetchTags,
  } = useQuery(GET_TAGS);

  const [addTag, { error: addTagError }] = useMutation(ADD_TAG);

  const addCategoryToTags = (newCategory: Option, newTags: Options) => {
    if (!newTags?.some(tag => tag?.value === newCategory?.value)) {
      return [...(newTags || []), newCategory];
    }
    return newTags;
  };

  const removeCategoryFromTags = (
    removedCategory: Option,
    newTags: Options
  ) => {
    return newTags?.filter(tag => tag.value !== removedCategory.value);
  };

  const handlePillChange = (val: Options) => {
    const removedCategory = currentCategory?.find(
      category => !val.some(newCategory => newCategory.value === category.value)
    );

    let newTags = currentTags || [];

    if (removedCategory) {
      newTags = removeCategoryFromTags(removedCategory, newTags);
    } else {
      const newCategory = val[val.length - 1];
      newTags = addCategoryToTags(newCategory, newTags);
    }

    setValue('tags', newTags);
  };

  const handleCreatablePillChange = (val: MultiValue<any>) => {
    const categoryVal = val.filter((v: any) => v.notRemovable);

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
        options={categoryData?.categories}
        onPillChange={handlePillChange}
      />
      <CreatablePill
        label='Tags'
        name='tags'
        loading={loadingTags}
        options={tagData?.tags}
        onCreateOption={handleCreateOption}
        onPillChange={handleCreatablePillChange}
        hasRemovable
      />
    </>
  );
};

export default Labels;
