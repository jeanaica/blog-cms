import Button from 'components/icon/IconButton';
import { FC } from 'react';

const PostActions: FC = () => (
  <>
    <Button icon='delete' />
    <Button
      icon='edit'
      className='ml-4'
    />
  </>
);

export default PostActions;
