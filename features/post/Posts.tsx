import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';

import Container from 'components/container/Container';
import useToast from 'components/toast/hook';

import { Article } from 'shared/types/Article';

import Header from './components/Header';
import Item from './components/Item';

import { UPDATE_POST_STATUS_MUTATION } from './schema/mutations';
import { GET_POST_BY_STATUS } from './schema/queries';

const Posts = () => {
  const toast = useToast();
  const { t } = useTranslation('common');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { loading, data, refetch } = useQuery(GET_POST_BY_STATUS, {
    variables: { status: selectedOption },
  });

  const [updatePost, { loading: updateLoading }] = useMutation(
    UPDATE_POST_STATUS_MUTATION
  );

  const handleOnChange = (selectedOption: string | null) =>
    setSelectedOption(selectedOption);

  const handleUpdateStatus = useCallback(
    async (id: string, status: string) => {
      let message = t('updateSuccess');

      try {
        await updatePost({
          variables: { id, post: { status } },
        });

        toast('success', message);

        refetch({ status: selectedOption });
      } catch (e) {
        message = t('updateFail');
        toast('error', message);
      }
    },
    [updatePost, refetch, selectedOption, toast, t]
  );

  useEffect(() => {
    refetch({ status: selectedOption });
  }, [selectedOption, refetch]);

  return (
    <div className='p-8'>
      <Header onChange={handleOnChange} />

      <Container
        loading={loading}
        isEmpty={!data?.posts.length}>
        {data?.posts.map((post: Article) => (
          <Item
            key={post.id}
            id={post.id}
            post={post}
            onUpdate={handleUpdateStatus}
            loading={loading || updateLoading}
          />
        ))}
      </Container>
    </div>
  );
};

export default Posts;
