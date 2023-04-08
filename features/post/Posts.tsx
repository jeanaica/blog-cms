import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import Container from 'components/container/Container';

import { UPDATE_POST_MUTATION } from 'graphql/mutations';
import { GET_POST_BY_STATUS } from 'graphql/queries';

import { Post as PostType } from 'types/Post';

import Header from './Header';
import Post from './Post';

const Posts = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_POST_BY_STATUS, {
    variables: { status: selectedOption },
  });

  const [updatePost, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_POST_MUTATION);

  const handleOnChange = (selectedOption: string | null) => {
    setSelectedOption(selectedOption);
  };

  const handleUpdateStatus = useCallback(
    async (id: string, status: string) => {
      try {
        await updatePost({
          variables: { id, post: { status } },
        });
      } catch (e) {
        console.error('Error updating post:', e);
      }
    },
    [updatePost]
  );

  useEffect(() => {
    refetch({ status: selectedOption });
  }, [selectedOption, refetch]);

  return (
    <div className='pb-40 md:pb-12'>
      <Header onChange={handleOnChange} />

      <Container
        loading={loading}
        isEmpty={!data?.posts.length}>
        {data?.posts.map((post: PostType) => (
          <Post
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
