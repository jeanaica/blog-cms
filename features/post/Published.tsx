import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { Posts } from 'lib/firebase/post/types';
import { getPublishedPosts } from 'lib/firebase/post/get';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';
import PostModal from './shared/PostModal';
import { unpublishPost } from 'lib/firebase/post/actions';

const Published: FC = () => {
  const [posts, setPosts] = useState<Posts>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, [activeId]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);

      const published = await getPublishedPosts({});

      setPosts(published);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowModal = () => {
    setError('');
    setShowModal(!showModal);
  };

  const handleActiveId = (id: string) => {
    setActiveId(id);
  };

  const handleModalAction = async () => {
    try {
      setError('');
      setIsActionLoading(true);
      await unpublishPost(activeId);

      setActiveId('');
    } catch (error) {
      console.log(error);
      setError('Failed to unpublish post.');
    } finally {
      setIsActionLoading(false);
      setShowModal(false);
    }
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
                onUnpublish={handleShowModal}
              />
            }
            key={id}>
            <ListContent
              title={title}
              content={content}
              date={publishedDate}
              label='Published date'
            />
          </ListItem>
        ))}

        <PostModal
          showModal={showModal}
          action='unpublish'
          isLoading={isActionLoading}
          error={error}
          onClose={handleShowModal}
          onModalAction={handleModalAction}
        />
      </>
    </List>
  );
};

export default Published;
