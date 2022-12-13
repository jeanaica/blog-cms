import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { getDrafts } from 'lib/firebase/post/get';
import { Posts } from 'lib/firebase/post/types';
import { deletePost } from 'lib/firebase/post/actions';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';
import PostModal from './shared/PostModal';

const Drafts: FC = () => {
  const [posts, setPosts] = useState<Posts>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>('');
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, [activeId]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const drafts = await getDrafts({});

      setPosts(drafts);
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

      await deletePost(activeId);

      setActiveId('');
    } catch (error) {
      console.log(error);
      setError('Failed to delete draft.');
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
        {posts.map(({ id, title, content, modifiedDate }) => (
          <ListItem
            actions={
              <PostActions
                id={id}
                onActiveId={handleActiveId}
                onDelete={handleShowModal}
              />
            }
            key={id}>
            <ListContent
              title={title}
              content={content}
              date={modifiedDate}
              label='Last modified date'
            />
          </ListItem>
        ))}
        <PostModal
          showModal={showModal}
          action='delete'
          isLoading={isActionLoading}
          error={error}
          onClose={handleShowModal}
          onModalAction={handleModalAction}
        />
      </>
    </List>
  );
};

export default Drafts;
