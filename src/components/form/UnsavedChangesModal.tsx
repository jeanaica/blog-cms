import { FC } from 'react';
import useTranslation from 'hooks/useTranslation';

import Button from 'components/button/Button';
import Modal from 'components/modal/Modal';
import { useWarnIfUnsavedChanges } from 'hooks/useWarnIfUnsavedChanges';

type Props = {
  hasUnsavedChanges: boolean;
};

const UnsavedChangesModal: FC<Props> = ({ hasUnsavedChanges }) => {
  const { t } = useTranslation('common');
  const { navigate, shouldWarn, cancelNavigate } =
    useWarnIfUnsavedChanges(hasUnsavedChanges);

  return (
    <Modal showModal={shouldWarn}>
      <div className='flex flex-col'>
        <span>{t('unsavedChanges')}</span>
        <div className='flex justify-center md:justify-end gap-4 mt-8'>
          <Button
            text={t('cancel')}
            onClick={cancelNavigate}
          />
          <Button
            primary
            className='text-base'
            text={t('leave')}
            onClick={navigate}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UnsavedChangesModal;
