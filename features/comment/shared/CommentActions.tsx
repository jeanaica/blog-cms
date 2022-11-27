import Button from 'components/icon/IconButton';
import { FC } from 'react';

type Props = {
  hasEdit?: boolean;
};

const CommentActions: FC<Props> = ({ hasEdit = false }) => (
  <>
    <Button icon='delete' />
    {!hasEdit && (
      <Button
        icon='quickreply'
        className='ml-4'
      />
    )}
    {hasEdit && (
      <Button
        icon='edit'
        className='ml-4'
      />
    )}
  </>
);

export default CommentActions;
