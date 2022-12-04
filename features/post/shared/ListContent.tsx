import { FC } from 'react';

type Props = {
  title: string;
  content: string;
  date?: string;
  label?: string;
};

const ListContent: FC<Props> = ({ title, content, date, label }) => (
  <div className='flex-[4] overflow-hidden flex-col'>
    <h3 className='text-l font-PoppinsSemiBold mt-3 mb-2'>{title}</h3>
    <div className='text-ellipsis overflow-hidden whitespace-nowrap flex-col'>
      <span className='font-PoppinsExtraLight'>{content}</span>
    </div>
    <div>
      {label && <span className='font-PoppinsLight text-xs'>{label}: </span>}
      {date && <span className='font-PoppinsExtraLight text-xs'>{date}</span>}
    </div>
  </div>
);

export default ListContent;
