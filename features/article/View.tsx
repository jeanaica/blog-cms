import { FC } from 'react';

type Props = {
  content?: string;
};

const View: FC<Props> = ({ content }) => (
  <div className='flex justify-center w-full h-full'>
    <div className='w-3/4 py-24'>
      <div dangerouslySetInnerHTML={{ __html: content || '' }} />
    </div>
  </div>
);

export default View;
