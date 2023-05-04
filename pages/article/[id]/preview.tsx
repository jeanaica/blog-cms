import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Container from 'components/container/Container';
import Shared from 'components/layout/Shared';

import View from 'features/article/View';

const PreviewPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [content, setContent] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setContent(localStorage.getItem(`preview-${id}`) || '');
    }
  }, [id]);

  return (
    <Container
      isEmpty={!content}
      full>
      <View content={content} />
    </Container>
  );
};

PreviewPage.Layout = Shared;

export default PreviewPage;
