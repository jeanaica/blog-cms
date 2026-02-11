import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import IconButton from 'components/icon/IconButton';

import ReactPortal from './Portal';

type Props = {
  showModal?: boolean;
  children?: ReactNode;
  onClose?(): void;
  disabled?: boolean;
};

const Modal: FC<Props> = ({ showModal, children, onClose, disabled }) => (
  <ReactPortal wrapperId='react-portal-modal-container'>
    <div
      tabIndex={-1}
      className={classNames(
        'fixed inset-0 z-50 p-4 overflow-hidden h-modal md:h-full flex justify-center',
        {
          hidden: !showModal,
          'backdrop-blur-sm': showModal,
        }
      )}
      data-modal-backdrop='static'>
      <div className='absolute top-1/4 w-3/4 md:w-full h-full max-w-md md:h-auto mt-8'>
        <div className='relative bg-white rounded-lg shadow'>
          {onClose && (
            <IconButton
              icon='close'
              size='2xl'
              className='absolute top-3 right-2.5 rounded-full hover:bg-gray-200'
              tooltip='Close Modal'
              disabled={disabled}
              onClick={onClose}
            />
          )}
          <div className='p-6 text-center'>{children}</div>
        </div>
      </div>
    </div>
  </ReactPortal>
);

export default Modal;
