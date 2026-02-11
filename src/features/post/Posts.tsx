import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import useTranslation from 'hooks/useTranslation';

import Container from 'components/container/Container';
import useToast from 'components/toast/hook';

import Header from './components/Header';
import Item from './components/Item';

import { UPDATE_POST_STATUS_MUTATION } from './schema/mutations';
import { GET_POST_BY_STATUS } from './schema/queries';

import { Article } from './types/Article';

const Posts = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<{
    [option: string]: string | null;
  }>({ status: 'PUBLISHED', sort: 'desc' });

  const { loading, data, refetch } = useQuery(GET_POST_BY_STATUS, {
    variables: {
      status: selectedOption['status'],
      sort: selectedOption['sort'],
    },
  });

  const [updatePost, { loading: updateLoading }] = useMutation(
    UPDATE_POST_STATUS_MUTATION
  );

  const handleOnChange = (option: string, selected: string | null) =>
    setSelectedOption({ [option]: selected });

  const handleUpdateStatus = useCallback(
    async (id: string, status: string) => {
      let message = t('updateSuccess');

      try {
        await updatePost({
          variables: { id, post: { status } },
        });

        toast('success', message);

        refetch({
          status: selectedOption['status'],
          sort: selectedOption['sort'],
        });
      } catch (e) {
        message = t('updateFail');
        toast('error', message);
      }
    },
    [updatePost, refetch, selectedOption, toast, t]
  );

  useEffect(() => {
    refetch({ status: selectedOption['status'], sort: selectedOption['sort'] });
  }, [selectedOption, refetch]);

  return (
    <div className='pb-8'>
      <Header onChange={handleOnChange} />

      <Container
        loading={loading}
        isEmpty={!data?.posts.length}
        className='px-8'>
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
