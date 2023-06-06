import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import Loading from 'components/Loading';
import Modal from 'components/modal/Modal';

type Props = {
  isOpen?: boolean;
};

const LoadingModal: FC<Props> = ({ isOpen }) => {
  const { t } = useTranslation('common');

  return (
    <Modal showModal={isOpen}>
      <Loading text={`${t('pleaseWait')}...`} />
    </Modal>
  );
};

export default LoadingModal;
