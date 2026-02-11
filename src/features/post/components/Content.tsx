import type { FC } from 'react';

import { Status } from '../types/Status';

import DateLabel from './DateLabel';

type Props = {
  title: string;
  content: string;
  updatedAt: number;
  publishedAt?: number;
  archivedAt?: number;
  status: Status;
};

const REGEX = /(<([^>]+)>)/gi;

const Content: FC<Props> = ({
  title,
  content,
  updatedAt,
  publishedAt,
  archivedAt,
  status,
}) => {
  const strippedContent = content.replace(REGEX, ' ');

  return (
    <div className='flex-[4] overflow-hidden flex-col text-left'>
      <h3 className='text-l font-PoppinsSemiBold mt-3 mb-2'>{title}</h3>
      <div className='text-ellipsis overflow-hidden whitespace-nowrap flex-col'>
        <span className='font-PoppinsExtraLight'>{strippedContent}</span>
      </div>
      <div className='not-prose font-PoppinsExtraLight text-xs'>
        <DateLabel
          updatedAt={updatedAt}
          publishedAt={publishedAt}
          archivedAt={archivedAt}
          status={status}
        />
      </div>
    </div>
  );
};

export default Content;
