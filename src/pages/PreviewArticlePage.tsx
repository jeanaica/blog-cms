import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'components/container/Container';
import View from 'features/article/View';

const PreviewArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(localStorage.getItem(`preview-${id}`) || '');
  }, [id]);

  return (
    <Container isEmpty={!content} full>
      <View content={content} />
    </Container>
  );
};

export default PreviewArticlePage;
