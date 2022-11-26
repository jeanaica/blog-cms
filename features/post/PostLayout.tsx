import Tabs from 'components/tabs/Tabs';
import TabSection from 'components/tabs/TabSection';
import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

const PostLayout = ({ children }: Props) => (
  <div className='h-full w-full drop-shadow-md bg-white'>
    <Tabs
      tabs={[
        {
          text: 'Drafts',
          icon: 'feed',
          href: '/post/drafts',
          indexHref: '/post',
        },
        {
          text: 'Published',
          icon: 'assignment_turned_in',
          href: '/post/published',
        },
        {
          text: 'Scheduled',
          icon: 'event',
          href: '/post/scheduled',
        },
      ]}
    />
    <TabSection>{children}</TabSection>
  </div>
);

export default PostLayout;
