import { FC } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import CommentActions from './shared/CommentActions';
import ListComment from './shared/ListComment';

const Unread: FC = () => (
  <List>
    <>
      <ListItem actions={<CommentActions />}>
        <ListComment
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<CommentActions />}>
        <ListComment
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<CommentActions />}>
        <ListComment
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<CommentActions />}>
        <ListComment
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<CommentActions />}>
        <ListComment
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
    </>
  </List>
);

export default Unread;
