import { FC, useEffect, useState } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import { Comments } from 'lib/firebase/comment/types';

import CommentActions from './shared/CommentActions';
import ListComment from './shared/ListComment';
import DeleteModal from './shared/DeleteModal';
import ViewModal from './shared/ViewModal';
import ReplyModal from './shared/ReplyModal';

import commentsJson from 'mock/comments.json';

const Unread: FC = () => {
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
      const unreadComments = commentsJson.filter(({ isUnread }) => isUnread);

      setComments(unreadComments);
    } catch (error) {
      console.log(error);
    } finally {
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);

        clearTimeout(loadingTimeout);
      }, 1000);
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

      setActiveId('');
      setPostId('');
    } catch (error) {
      console.log(error);
      setError('Failed to delete comment.');
    } finally {
      const actionLoadingTimeout = setTimeout(() => {
        setIsActionLoading(false);
        setShowModal('');
        clearTimeout(actionLoadingTimeout);
      }, 1000);
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
                  onModalShow={handleShowModal}
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
        <DeleteModal
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
          showModal={showModal === 'view'}
          isLoading={isActionLoading}
          onClose={handleClose}
        />
        <ReplyModal
          postId={postId}
          activeId={activeId}
          showModal={showModal === 'reply'}
          isLoading={isActionLoading}
          onClose={handleClose}
        />
      </>
    </List>
  );
};

export default Unread;
