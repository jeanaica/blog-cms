import { FC } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import CommentActions from './shared/CommentActions';
import ListContent from './shared/ListComment';

const Read: FC = () => (
  <List>
    <>
      <ListItem actions={<CommentActions />}>
        <ListContent
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<CommentActions />}>
        <ListContent
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<CommentActions />}>
        <ListContent
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<CommentActions />}>
        <ListContent
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<CommentActions />}>
        <ListContent
          title='Story Title'
          comment='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
    </>
  </List>
);

export default Read;
