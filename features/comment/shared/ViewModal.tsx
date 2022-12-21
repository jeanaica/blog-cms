import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import Modal from 'components/modal/Modal';
import Loading from 'components/loading/Loading';

import { Comments, Comment } from 'lib/firebase/comment/types';

import commentsJson from 'mock/comments.json';

type Props = {
  postId: string;
  activeId: string;
  showModal?: boolean;
  isLoading: boolean;
  onClose?(): void;
  action?: string;
};

const ViewModal: FC<Props> = ({
  postId,
  activeId,
  showModal,
  isLoading,
  onClose,
  action = 'unread',
}) => {
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comments>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setComments([]);
    if (postId && activeId) {
      fetchComments();
    }
    return () => setComments([]);
  }, [postId, activeId]);

  const fetchComments = async () => {
    try {
      setIsCommentLoading(true);

      setComments(commentsJson);
    } catch (error) {
      console.log(error);
      setError('Failed to fetch comment. Please try again.');
    } finally {
      const loadingTimeout = setTimeout(() => {
        setIsCommentLoading(false);

        clearTimeout(loadingTimeout);
      }, 1000);
    }
  };

  useEffect(() => {
    const element = document.getElementById(activeId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments, activeId]);

  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      disabled={isLoading}>
      {!isCommentLoading ? (
        <div className='flex-col text-left'>
          <h3 className='text-lg font-normal text-gray-400 font-PoppinsSemiBold mb-4'>
            {comments && comments[0]?.postTitle}
          </h3>
          {error && <p className='m-5 text-error-400'>{error}</p>}
          <ul className='max-h-96 overflow-y-auto p-4'>
            {comments?.map(({ id, name, comment, postedDate }) => (
              <div
                className={classNames('mt-8 mb-4 rounded-lg bg-slate-200 p-4', {
                  'bg-slate-400': id === activeId,
                })}
                key={id}
                id={id}>
                <div className='flex justify-between items-center mb-4'>
                  <h3
                    className={classNames(
                      'text-l text-gray-600 font-PoppinsSemiBold',
                      {
                        'text-gray-200': id === activeId,
                      }
                    )}>
                    {name}
                  </h3>
                  <span className='font-PoppinsExtraLight text-xs'>
                    {postedDate}
                  </span>
                </div>
                <p className='font-PoppinsExtraLight'>{comment}</p>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div className='flex justify-center p-12 flex-col items-center'>
          <Loading className='text-gray-500' />
          <span className='text-gray-500'>Loading... </span>
        </div>
      )}
    </Modal>
  );
};

export default ViewModal;
