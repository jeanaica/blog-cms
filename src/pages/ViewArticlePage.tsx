import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Container from 'components/container/Container';
import View from 'features/article/View';
import Meta from 'features/article/components/Meta';
import { GET_ARTICLE_BY_ID } from 'features/article/schema/queries';

const ViewArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useQuery(GET_ARTICLE_BY_ID, {
    variables: { id },
  });

  const post = data?.post || null;

  return (
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
};

export default ViewArticlePage;
