import type { FC } from 'react';

import { type GalleryStatus } from '../types/Gallery';
import DateLabel from './DateLabel';

type Props = {
  title: string;
  description?: string;
  images: any[];
  updatedAt?: number;
  publishedAt?: number;
  archivedAt?: number;
  status: GalleryStatus;
};

const Content: FC<Props> = ({
  title,
  description,
  images,
  updatedAt,
  publishedAt,
  archivedAt,
  status,
}) => {
  const imageCount = images?.length || 0;

  return (
    <div className='flex-[4] overflow-hidden flex-col text-left'>
      <h3 className='text-l font-PoppinsSemiBold mt-3 mb-2'>{title}</h3>
      <div className='text-ellipsis overflow-hidden whitespace-nowrap flex-col'>
        <span className='font-PoppinsExtraLight'>
          {description || `${imageCount} image${imageCount !== 1 ? 's' : ''}`}
        </span>
      </div>
      {updatedAt && (
        <div className='not-prose font-PoppinsExtraLight text-xs'>
          <DateLabel
            updatedAt={updatedAt}
            publishedAt={publishedAt}
            archivedAt={archivedAt}
            status={status}
          />
        </div>
      )}
    </div>
  );
};

export default Content;
