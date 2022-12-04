import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { Posts } from 'lib/firebase/post/types';
import { getUnpublishedPosts } from 'lib/firebase/post/get';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';

const Unpublished: FC = () => {
  const [posts, setPosts] = useState<Posts>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, [activeId]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);

      const unpublished = await getUnpublishedPosts({});

      setPosts(unpublished);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActiveId = (id: string) => {
    setActiveId(id);
  };

  return (
    <List
      loading={isLoading}
      isEmpty={!posts.length}>
      <>
        {posts.map(({ id, title, content, publishedDate }) => (
          <ListItem
            actions={
              <PostActions
                id={id}
                onActiveId={handleActiveId}
              />
            }
            key={id}>
            <ListContent
              title={title}
              content={content}
              date={publishedDate}
              label='Last published date'
            />
          </ListItem>
        ))}
      </>
    </List>
  );
};

export default Unpublished;
