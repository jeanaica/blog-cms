import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { GET_POST_BY_STATUS } from 'graphql/queries';
import { UPDATE_POST_MUTATION } from 'graphql/mutations';
import { Post as PostType } from 'types/Post';

import Container from 'components/container/Container';

import Header from './Header';
import PostItem from './PostItem';
import PostActions from './PostActions';

const Posts = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showActions, setShowActions] = useState<string>();

  const { loading, error, data, refetch } = useQuery(GET_POST_BY_STATUS, {
    variables: { status: selectedOption },
  });

  const [updatePost, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_POST_MUTATION);

  const handleOnChange = (selectedOption: string | null) => {
    setSelectedOption(selectedOption);
  };

  const handleEdit = useCallback(
    (id: string) => () => {
      router.push(`/article/${id}/edit`);
    },
    [router]
  );

  const handleUpdateStatus = useCallback(
    (id: string, status: string) => async () => {
      try {
        const { data } = await updatePost({
          variables: { id, post: { status } },
        });
        console.log('Updated post:', data.updateStatus);
      } catch (e) {
        console.error('Error updating post:', e);
      }
    },
    [updatePost]
  );

  const handleHover = useCallback(
    (id: string) => () => {
      setShowActions(id);
    },
    []
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
          <div
            key={post.id}
            role='button'
            onClick={handleEdit(post.id)}
            title='Edit post'
            className='flex border border-slate-300 p-4 my-4 bg-white hover:drop-shadow-md rounded'
            onMouseEnter={handleHover(post.id)}
            onMouseLeave={handleHover('')}>
            <PostItem {...post} />
            {post.id === showActions && (
              <PostActions
                id={post.id}
                status={post.status.toLowerCase()}
                onMoveToDrafts={handleUpdateStatus(post.id, 'DRAFT')}
                onDelete={handleUpdateStatus(post.id, 'ARCHIVED')}
              />
            )}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Posts;
