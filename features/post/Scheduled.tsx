import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { Posts } from 'lib/firebase/post/types';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';
import PostModal from './shared/PostModal';

import postsJson from 'mock/posts.json';

const Scheduled: FC = () => {
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
      const scheduled = postsJson.filter(({ isScheduled }) => isScheduled);

      setPosts(scheduled);
    } catch (error) {
      console.log(error);
    } finally {
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);

        clearTimeout(loadingTimeout);
      }, 1000);
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

      setActiveId('');
    } catch (error) {
      console.log(error);
      setError('Failed to unschedule post.');
    } finally {
      const actionLoadingTimeout = setTimeout(() => {
        setIsActionLoading(false);
        setShowModal(false);
        clearTimeout(actionLoadingTimeout);
      }, 1000);
    }
  };

  return (
    <List
      loading={isLoading}
      isEmpty={!posts.length}>
      <>
        {posts.map(({ id, title, content, postDate }) => (
          <ListItem
            actions={
              <PostActions
                id={id}
                onActiveId={handleActiveId}
                onCancel={handleShowModal}
              />
            }
            key={id}>
            <ListContent
              title={title}
              content={content}
              date={postDate}
              label='Post date'
            />
          </ListItem>
        ))}

        <PostModal
          showModal={showModal}
          action='unschedule'
          isLoading={isActionLoading}
          error={error}
          onClose={handleShowModal}
          onModalAction={handleModalAction}
        />
      </>
    </List>
  );
};

export default Scheduled;
