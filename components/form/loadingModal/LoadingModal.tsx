import { FC } from 'react';

import Loading from 'components/loading/Loading';
import Modal from 'components/modal/Modal';

type Props = {
  isOpen?: boolean;
};

const LoadingModal: FC<Props> = ({ isOpen }) => (
  <Modal showModal={isOpen}>
    <Loading text='Please wait...' />
  </Modal>
);

export default LoadingModal;
