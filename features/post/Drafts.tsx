import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import EmptyList from 'components/list/EmptyList';

import { getDrafts } from 'lib/firebase/post/get';
import { Posts } from 'lib/firebase/post/types';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';

const Drafts: FC = () => {
  const [posts, setPosts] = useState<Posts>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const drafts = await getDrafts({});

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
            {posts.map(({ id, title, content, modifiedDate }) => (
              <ListItem
                actions={<PostActions />}
                key={id}>
                <ListContent
                  title={title}
                  content={content}
                  date={modifiedDate}
                  label='Last modified date'
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

export default Drafts;
