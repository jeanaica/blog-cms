import React, { FC } from 'react';

type Props = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};

const PostItem: FC<Props> = ({ id, title, content, updatedAt }) => {
  const formattedDate = new Date(updatedAt).toLocaleString();

  return (
    <div className='flex-[4] overflow-hidden flex-col text-left'>
      <h3 className='text-l font-PoppinsSemiBold mt-3 mb-2'>{title}</h3>
      <div className='text-ellipsis overflow-hidden whitespace-nowrap flex-col'>
        <span className='font-PoppinsExtraLight'>{content}</span>
      </div>
      <div>
        <span className='font-PoppinsExtraLight text-xs'>{formattedDate}</span>
      </div>
    </div>
  );
};

export default PostItem;
