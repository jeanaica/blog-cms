import { FC } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';

const Drafts: FC = () => (
  <List>
    <>
      <ListItem actions={<PostActions />}>
        <ListContent
          title='Story Title'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<PostActions />}>
        <ListContent
          title='Story Title'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<PostActions />}>
        <ListContent
          title='Story Title'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<PostActions />}>
        <ListContent
          title='Story Title'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
      <ListItem actions={<PostActions />}>
        <ListContent
          title='Story Title'
          content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          date='January 23, 2023'
        />
      </ListItem>
    </>
  </List>
);

export default Drafts;
