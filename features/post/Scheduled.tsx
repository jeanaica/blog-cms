import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import EmptyList from 'components/list/EmptyList';

import { Posts } from 'lib/firebase/post/types';
import { getScheduledPosts } from 'lib/firebase/post/get';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';

const Scheduled: FC = () => {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const scheduled = await getScheduledPosts({});

      setPosts(scheduled);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts?.length ? (
        <List>
          <>
            {posts.map(({ id, title, content, postDate }) => (
              <ListItem
                actions={<PostActions />}
                key={id}>
                <ListContent
                  title={title}
                  content={content}
                  date={postDate}
                  label='Post date'
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

export default Scheduled;
