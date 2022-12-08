import { FC } from 'react';

type Props = {
  title: string;
  name: string;
  comment: string;
  date: string;
  label: string;
};

const ListComment: FC<Props> = ({ title, name, comment, date, label }) => (
  <div className='flex-[4] overflow-hidden flex-col'>
    <h3 className='text-l font-PoppinsSemiBold mt-3 mb-0'>{title}</h3>
    <h5 className='text-l font-PoppinsSemiBold mb-1 text-gray-400'>{name}</h5>
    <div className='text-ellipsis overflow-hidden whitespace-nowrap flex-col'>
      <span className='font-PoppinsExtraLight'>{comment}</span>
    </div>
    <span className='font-PoppinsExtraLight text-xs'>
      {label}
      {date}
    </span>
  </div>
);

export default ListComment;
