import { type FC, memo } from 'react';

import { Status } from '../types/Status';
import { type Image } from '../types/Image';

import DateLabel from './DateLabel';

type Props = {
  title: string;
  description?: string;
  imageCount: number;
  updatedAt?: number;
  publishedAt?: number;
  scheduledAt?: number;
  status: Status;
  images: Image[];
};

const MAX_PREVIEW = 4;

const Content: FC<Props> = ({
  title,
  description,
  imageCount,
  updatedAt,
  publishedAt,
  scheduledAt,
  status,
  images,
}) => {
  const previewImages = images.slice(0, MAX_PREVIEW);
  const remainingCount = images.length - MAX_PREVIEW;

  return (
    <div className='flex gap-6 flex-1 overflow-hidden'>
      {/* Image collage on the left */}
      {previewImages.length > 0 && (
        <div className='w-72 h-48 flex-shrink-0'>
          {previewImages.length === 1 ? (
            // Single image: full width
            <div className='relative h-full rounded overflow-hidden shadow-sm'>
              <img
                src={previewImages[0].url}
                alt={previewImages[0].alt || title}
                className='w-full h-full object-cover m-0'
              />
            </div>
          ) : (
            // Multiple images: grid layout with first image larger
            <div className='grid grid-cols-3 grid-rows-3 gap-1 rounded overflow-hidden h-full shadow-sm'>
              {previewImages.map((image, index) => {
                const isFirst = index === 0;
                const isLast = index === previewImages.length - 1;
                const showOverlay = isLast && remainingCount > 0;

                return (
                  <div
                    key={`${image.url}-${index}`}
                    className={`relative ${isFirst ? 'col-span-2 row-span-3' : 'col-span-1 row-span-1'}`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || title}
                      className='w-full h-full object-cover m-0'
                    />
                    {showOverlay && (
                      <div className='absolute inset-0 bg-black/60 flex items-center justify-center'>
                        <span className='text-white text-2xl font-semibold'>
                          +{remainingCount}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Content on the right */}
      <div className='flex-1 overflow-hidden flex flex-col text-left justify-center'>
        <h3 className='text-l font-PoppinsSemiBold mb-2'>{title}</h3>
        <div className='text-ellipsis overflow-hidden whitespace-nowrap'>
          <span className='font-PoppinsExtraLight text-sm text-gray-600'>
            {imageCount} image{imageCount !== 1 ? 's' : ''}
            {description && ' · ' + description}
          </span>
        </div>
        <div className='not-prose font-PoppinsExtraLight text-xs mt-2'>
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

export default memo(Content);
