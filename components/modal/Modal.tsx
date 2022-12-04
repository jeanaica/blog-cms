import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import IconButton from 'components/icon/IconButton';

import ReactPortal from './Portal';

type Props = {
  showModal?: boolean;
  children?: ReactNode;
  onClose?(): void;
};

const Modal: FC<Props> = ({ showModal, children, onClose }) => (
  <ReactPortal wrapperId='react-portal-modal-container'>
    <div
      tabIndex={-1}
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full flex justify-center',
        {
          hidden: !showModal,
          'backdrop-blur-sm': showModal,
        }
      )}
      data-modal-backdrop='static'>
      <div className='relative w-full h-full max-w-md md:h-auto mt-8'>
        <div className='relative bg-white rounded-lg shadow'>
          <IconButton
            icon='close'
            className='absolute top-3 right-2.5 rounded-full hover:bg-gray-200'
            iconClassName='text-2xl'
            tooltip='Close Modal'
            onClick={onClose}
          />
          <div className='p-6 text-center'>{children}</div>
        </div>
      </div>
    </div>
  </ReactPortal>
);

export default Modal;
