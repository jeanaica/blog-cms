import { FC, ReactElement } from 'react';
import classNames from 'classnames';
import useTranslation from 'hooks/useTranslation';

import Loading from 'components/Loading';

import Empty from './Empty';

type Props = {
  children: ReactElement;
  loading?: boolean;
  isEmpty?: boolean;
  full?: boolean;
  className?: string;
};

const Container: FC<Props> = ({
  children,
  loading,
  isEmpty,
  full,
  className,
}) => {
  const { t } = useTranslation('common');

  return (
    <div
      className={classNames('prose', className, {
        'w-screen h-screen': full,
      })}>
      {loading ? (
        <div className='flex justify-center p-12 flex-col items-center'>
          <Loading text={`${t('loading')}...`} />
        </div>
      ) : isEmpty ? (
        <Empty />
      ) : (
        children
      )}
    </div>
  );
};

export default Container;
