import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Shared from 'components/layout/Shared';
import Container from 'components/container/Container';

import View from 'features/article/View';
import Meta from 'features/article/components/Meta';
import { GET_ARTICLE_BY_ID } from 'features/article/schema/queries';
import { Article } from 'features/post/types/Article';

import client from 'lib/client/apolloClient';

type Props = {
  post: Article | null;
  loading?: boolean;
  error?: unknown;
};

const ViewPage = ({
  post,
  loading,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Meta {...post?.meta} />
    <Container
      loading={loading}
      isEmpty={!post?.id}
      full>
      <View content={post?.content} />
    </Container>
  </>
);

ViewPage.Layout = Shared;

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { id } = context.params as { id: string };

  const { data, loading, error } = await client.query<Props>({
    query: GET_ARTICLE_BY_ID,
    variables: { id },
  });

  return {
    props: {
      post: data?.post || null,
      loading: loading || false,
      error: error || null,
    },
  };
};

export default ViewPage;
