import Button from 'components/icon/IconButton';
import { FC } from 'react';

type Props = {
  hasEdit?: boolean;
};

const CommentActions: FC<Props> = ({ hasEdit = false }) => (
  <div className='flex gap-1 ml-4'>
    <Button
      icon='forum'
      tooltip='View Comment/Thread'
    />
    {!hasEdit && (
      <Button
        icon='quickreply'
        tooltip='Reply to Comment'
      />
    )}
    {hasEdit && (
      <Button
        icon='edit'
        tooltip='Edit Comment'
      />
    )}
    <Button
      icon='delete'
      tooltip='Delete Comment'
    />
  </div>
);

export default CommentActions;
