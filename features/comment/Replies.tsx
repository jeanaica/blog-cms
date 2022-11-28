import { FC } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import CommentActions from './shared/CommentActions';
import ListComment from './shared/ListComment';

import commentJson from './shared/comments.json';

const Replies: FC = () => (
  <List>
    <>
      {commentJson.map(({ title, comment, date }, index) => (
        <ListItem
          actions={<CommentActions />}
          key={index}>
          <ListComment
            title={title}
            comment={comment}
            date={date}
          />
        </ListItem>
      ))}
    </>
  </List>
);

export default Replies;
