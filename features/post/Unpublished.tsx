import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import EmptyList from 'components/list/EmptyList';

import { Posts } from 'lib/firebase/post/types';
import { getUnpublishedPosts } from 'lib/firebase/post/get';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';

const Unpublished: FC = () => {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const drafts = await getUnpublishedPosts({});

      setPosts(drafts);
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
                  label='Last published date'
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

export default Unpublished;
