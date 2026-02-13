import type { FC } from 'react';

import { Status } from '../types/Status';

import DateLabel from './DateLabel';

type Props = {
  title: string;
  description?: string;
  imageCount: number;
  updatedAt?: number;
  publishedAt?: number;
  scheduledAt?: number;
  status: Status;
  thumbnail?: string;
  thumbnailAlt?: string;
};

const Content: FC<Props> = ({
  title,
  description,
  imageCount,
  updatedAt,
  publishedAt,
  scheduledAt,
  status,
  thumbnail,
  thumbnailAlt,
}) => {
  return (
    <div className='flex gap-4 flex-1 overflow-hidden'>
      {thumbnail && (
        <div className='w-24 h-24 flex-shrink-0'>
          <img
            src={thumbnail}
            alt={thumbnailAlt || title}
            className='w-full h-full object-cover rounded'
          />
        </div>
      )}
      <div className='flex-1 overflow-hidden flex-col text-left'>
        <h3 className='text-l font-PoppinsSemiBold mt-3 mb-2'>{title}</h3>
        <div className='text-ellipsis overflow-hidden whitespace-nowrap flex-col'>
          <span className='font-PoppinsExtraLight text-sm text-gray-600'>
            {imageCount} image{imageCount !== 1 ? 's' : ''}
            {description && ' · ' + description}
          </span>
        </div>
        <div className='not-prose font-PoppinsExtraLight text-xs'>
          <DateLabel
            updatedAt={updatedAt}
            publishedAt={publishedAt}
            scheduledAt={scheduledAt}
            status={status}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
