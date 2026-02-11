import { FC } from 'react';

import { Status } from '../types/Status';

type Props = {
  updatedAt: number;
  publishedAt?: number;
  archivedAt?: number;
  status: Status;
};

const formatDate = (timestamp: number) => new Date(timestamp).toLocaleString();

const DateLabel: FC<Props> = ({
  updatedAt,
  publishedAt,
  archivedAt,
  status,
}) => {
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case 'published':
      return (
        <>
          {publishedAt && (
            <span>
              <span className='text-gray-500 font-PoppinsSemiBold'>
                Published:
              </span>{' '}
              {formatDate(publishedAt)} ·{' '}
            </span>
          )}
          <span>
            <span className='text-gray-500 font-PoppinsSemiBold'>
              Last modified:
            </span>{' '}
            {formatDate(updatedAt)}
          </span>
        </>
      );
    case 'draft':
      return (
        <span>
          <span className='text-gray-500 font-PoppinsSemiBold'>
            Last modified:
          </span>{' '}
          {formatDate(updatedAt)}
        </span>
      );
    case 'archived':
      return (
        <>
          {archivedAt && (
            <span>
              <span className='text-gray-500 font-PoppinsSemiBold'>
                Archived:
              </span>{' '}
              {formatDate(archivedAt)}
            </span>
          )}
          {publishedAt && (
            <span>
              {archivedAt ? ' · ' : ''}
              <span className='text-gray-500 font-PoppinsSemiBold'>
                Published:
              </span>{' '}
              {formatDate(publishedAt)}
            </span>
          )}
        </>
      );
    default:
      return <span>{formatDate(updatedAt)}</span>;
  }
};

export default DateLabel;
