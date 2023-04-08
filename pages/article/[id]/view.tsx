import React from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import Shared from 'components/layout/Shared';
import Meta from 'components/meta/Meta';
import Container from 'components/container/Container';

import View from 'features/article/View';
import {
  GET_ALL_ARTICLE_IDS,
  GET_ARTICLE_BY_ID,
} from 'features/article/schema/queries';

import client from 'lib/client/apolloClient';

import { Article } from 'shared/types/Article';

type Props = {
  post: Article | null;
  loading?: boolean;
  error?: unknown;
};

const ViewPage = ({
  post,
  loading,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
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

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all blog post slugs from the API
  const { data } = await client.query({
    query: GET_ALL_ARTICLE_IDS,
  });

  // Generate paths based on the blog post slugs
  const paths = data.posts.map((post: Article) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async context => {
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
    revalidate: 60,
  };
};

export default ViewPage;
