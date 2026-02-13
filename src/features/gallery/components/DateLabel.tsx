import { FC } from 'react';

import { Status } from '../types/Status';

type Props = {
  updatedAt?: number;
  publishedAt?: number;
  scheduledAt?: number;
  status: Status;
};

const formatDate = (timestamp: number) => new Date(timestamp).toLocaleString();

const DateLabel: FC<Props> = ({
  updatedAt,
  publishedAt,
  scheduledAt,
  status,
}) => {
  switch (status) {
    case 'PUBLISHED':
      return (
        <>
          {publishedAt && (
            <span>
              <span className='text-gray-500 font-PoppinsSemiBold'>
                Published:
              </span>{' '}
              {formatDate(publishedAt)}
              {updatedAt && ' · '}
            </span>
          )}
          {updatedAt && (
            <span>
              <span className='text-gray-500 font-PoppinsSemiBold'>
                Last modified:
              </span>{' '}
              {formatDate(updatedAt)}
            </span>
          )}
        </>
      );
    case 'SCHEDULED':
      return (
        <span>
          <span className='text-gray-500 font-PoppinsSemiBold'>
            Scheduled for:
          </span>{' '}
          {scheduledAt ? formatDate(scheduledAt) : 'Not set'}
        </span>
      );
    case 'DRAFT':
      return (
        <span>
          <span className='text-gray-500 font-PoppinsSemiBold'>
            Last modified:
          </span>{' '}
          {updatedAt ? formatDate(updatedAt) : 'N/A'}
        </span>
      );
    case 'ARCHIVED':
      return (
        <>
          {publishedAt && (
            <span>
              <span className='text-gray-500 font-PoppinsSemiBold'>
                Published:
              </span>{' '}
              {formatDate(publishedAt)}
            </span>
          )}
        </>
      );
    default:
      return <span>{updatedAt ? formatDate(updatedAt) : 'N/A'}</span>;
  }
};

export default DateLabel;
