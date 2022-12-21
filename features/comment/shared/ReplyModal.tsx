import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import Modal from 'components/modal/Modal';
import Loading from 'components/loading/Loading';
import Button from 'components/button/Button';
import TextArea from 'components/textarea/TextArea';

import { getComment } from 'lib/firebase/comment/get';
import { Comment } from 'lib/firebase/comment/types';
import { editComment, replyComment } from 'lib/firebase/comment/actions';
import schema from './schema';

import commentsJson from 'mock/comments.json';

type Props = {
  postId: string;
  activeId: string;
  showModal?: boolean;
  isLoading: boolean;
  onClose(): void;
  action?: string;
};

const ReplyModal: FC<Props> = ({
  postId,
  activeId,
  showModal,
  isLoading,
  onClose,
  action,
}) => {
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const [commentData, setCommentData] = useState<Comment | null>(null);
  const [error, setError] = useState<string>('');

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      postId,
      postTitle: '',
      comment: '',
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setCommentData(null);
    if (postId && activeId) {
      fetchComments();
    }
    return () => setCommentData(null);
  }, [postId, activeId]);

  const fetchComments = async () => {
    try {
      setIsCommentLoading(true);

      const activeComment = commentsJson.filter(({ id }) => id === activeId)[0];

      setCommentData(activeComment);
      setValue('postTitle', activeComment.postTitle);

      if (action === 'edit') {
        setValue('comment', activeComment.comment);
      }
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

  const onSubmit = handleSubmit(async ({ postId, postTitle, comment }) => {
    try {
      setIsCommentLoading(true);
    } catch (error) {
      setError('Failed to submit comment. Please try again.');
      console.log(error);
    } finally {
      const loadingTimeout = setTimeout(() => {
        setIsCommentLoading(false);
        onClose();
        clearTimeout(loadingTimeout);
      }, 1000);
    }
  });

  useEffect(() => {
    const element = document.getElementById(activeId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commentData, activeId]);

  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      disabled={isLoading}>
      {!isCommentLoading ? (
        <>
          <div className='flex-col text-left'>
            <h3 className='text-lg font-normal text-gray-400 font-PoppinsSemiBold mb-4'>
              {commentData?.postTitle}
            </h3>
            {error && <p className='m-5 text-error-400'>{error}</p>}
            {action !== 'edit' && (
              <ul className='max-h-96 overflow-y-auto p-4'>
                <div className={classNames('rounded-lg bg-slate-200 p-4')}>
                  <div className='flex justify-between items-center mb-4'>
                    <h3
                      className={classNames(
                        'text-l text-gray-600 font-PoppinsSemiBold'
                      )}>
                      {commentData?.name}
                    </h3>
                    <span className='font-PoppinsExtraLight text-xs'>
                      {commentData?.postedDate}
                    </span>
                  </div>
                  <p className='font-PoppinsExtraLight'>
                    {commentData?.comment}
                  </p>
                </div>
              </ul>
            )}
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={onSubmit}
              className='flex flex-col gap-10 mt-8 p-4 pt-0'>
              <TextArea
                label='Comment'
                name='comment'
              />

              <Button
                type='submit'
                className='flex-1 h-[50px]'>
                Save
              </Button>
            </form>
          </FormProvider>
        </>
      ) : (
        <div className='flex justify-center p-12 flex-col items-center'>
          <Loading className='text-gray-500' />
          <span className='text-gray-500'>Loading... </span>
        </div>
      )}
    </Modal>
  );
};

export default ReplyModal;
