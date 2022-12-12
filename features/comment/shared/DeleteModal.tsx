import { FC } from 'react';

import Modal from 'components/modal/Modal';

type Props = {
  showModal?: boolean;
  action: string;
  isLoading: boolean;
  error?: string;
  onClose?(): void;
  onModalAction(): void;
};

const DeleteModal: FC<Props> = ({
  showModal,
  action,
  isLoading,
  error,
  onClose,
  onModalAction,
}) => (
  <Modal
    showModal={showModal}
    onClose={onClose}
    disabled={isLoading}>
    <h3 className='mt-5 mb-5 text-lg font-normal text-gray-500'>
      Are you sure you want to {action} this comment?
    </h3>
    <p className='m-5 text-error-400'>{error}</p>
    <button
      type='button'
      className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
      disabled={isLoading}
      onClick={onModalAction}>
      {`Yes, I'm sure`}
    </button>
    <button
      type='button'
      className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10'
      disabled={isLoading}
      onClick={onClose}>
      No, cancel
    </button>
  </Modal>
);

export default DeleteModal;
