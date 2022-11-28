import { FC } from 'react';

import List from 'components/list/List';
import ListItem from 'components/list/ListItem';

import ListContent from './shared/ListContent';
import PostActions from './shared/PostActions';

import postJson from './shared/posts.json';

const Unpublished: FC = () => (
  <List>
    <>
      {postJson.map(({ title, content, date }, index) => (
        <ListItem
          actions={<PostActions />}
          key={index}>
          <ListContent
            title={title}
            content={content}
            date={date}
          />
        </ListItem>
      ))}
    </>
  </List>
);

export default Unpublished;
