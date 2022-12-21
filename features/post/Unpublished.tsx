import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { Posts } from 'lib/firebase/post/types';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';

import postsJson from 'mock/posts.json';

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

      const unpublished = postsJson.filter(
        ({ isUnpublished }) => isUnpublished
      );

      setPosts(unpublished);
    } catch (error) {
      console.log(error);
    } finally {
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);

        clearTimeout(loadingTimeout);
      }, 1000);
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
