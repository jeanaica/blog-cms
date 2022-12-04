import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { Posts } from 'lib/firebase/post/types';
import { getPublishedPosts } from 'lib/firebase/post/get';
import EmptyList from 'components/list/EmptyList';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';

const Published: FC = () => {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const published = await getPublishedPosts({});

      setPosts(published);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts?.length ? (
        <List>
          <>
            {posts.map(({ id, title, content, publishedDate }) => (
              <ListItem
                actions={<PostActions />}
                key={id}>
                <ListContent
                  title={title}
                  content={content}
                  date={publishedDate}
                  label='Published date'
                />
              </ListItem>
            ))}
          </>
        </List>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Published;
