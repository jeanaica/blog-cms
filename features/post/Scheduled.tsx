import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { Posts } from 'lib/firebase/post/types';
import { getScheduledPosts } from 'lib/firebase/post/get';
import { unschedulePost } from 'lib/firebase/post/actions';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';
import PostModal from './shared/PostModal';

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
      const scheduled = await getScheduledPosts({});

      setPosts(scheduled);
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
      await unschedulePost(activeId);

      setActiveId('');
    } catch (error) {
      console.log(error);
      setError('Failed to unschedule post.');
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
