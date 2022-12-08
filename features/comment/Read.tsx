import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { deleteComment } from 'lib/firebase/comment/actions';
import { getRead } from 'lib/firebase/comment/get';
import { Comments } from 'lib/firebase/comment/types';

import CommentActions from './shared/CommentActions';
import ListComment from './shared/ListComment';
import CommentModal from './shared/CommentModal';
import ViewModal from './shared/ViewModal';

const Read: FC = () => {
  const [comments, setComments] = useState<Comments>([]);
  const [showModal, setShowModal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchComments();
  }, [activeId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const readComments = await getRead({});

      setComments(readComments);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowModal = (modal: string) => {
    setError('');
    setShowModal(modal);
  };

  const handleActiveId = (id: string, postId: string) => {
    setPostId(postId);
    setActiveId(id);
  };

  const handleModalAction = async () => {
    try {
      setError('');
      setIsActionLoading(true);

      await deleteComment(activeId);

      setActiveId('');
      setPostId('');
    } catch (error) {
      console.log(error);
      setError('Failed to delete comment.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setShowModal('');
    setActiveId('');
    setPostId('');
  };

  return (
    <List
      loading={isLoading}
      isEmpty={!comments.length}>
      <>
        {comments.map(
          ({ id, name, postTitle, comment, postedDate, postId }) => (
            <ListItem
              actions={
                <CommentActions
                  id={id}
                  postId={postId}
                  onActiveId={handleActiveId}
                  onDelete={handleShowModal}
                  onView={handleShowModal}
                />
              }
              key={id}>
              <ListComment
                name={name}
                title={postTitle}
                comment={comment}
                date={postedDate}
                label='Posted date: '
              />
            </ListItem>
          )
        )}
        <CommentModal
          showModal={showModal === 'delete'}
          action='delete'
          isLoading={isActionLoading}
          error={error}
          onClose={handleClose}
          onModalAction={handleModalAction}
        />
        <ViewModal
          postId={postId}
          activeId={activeId}
          action='read'
          showModal={showModal === 'view'}
          isLoading={isActionLoading}
          onClose={handleClose}
        />
      </>
    </List>
  );
};

export default Read;
