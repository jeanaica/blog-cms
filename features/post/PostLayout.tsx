import { ReactElement } from 'react';

import Loading from 'components/loading/Loading';
import Tabs from 'components/tabs/Tabs';
import TabSection from 'components/tabs/TabSection';

import { usePageLoading } from 'lib/hooks/usePageLoading';

type Props = {
  children: ReactElement;
};

const PostLayout = ({ children }: Props) => {
  const isPageLoading = usePageLoading();

  return (
    <div className='h-full w-full drop-shadow-md bg-white overflow-hidden flex flex-col'>
      <Tabs
        isPage
        tabs={[
          {
            text: 'Drafts',
            icon: 'feed',
            href: '/post/drafts',
            indexHref: '/post',
          },
          {
            text: 'Scheduled',
            icon: 'event',
            href: '/post/scheduled',
          },
          {
            text: 'Published',
            icon: 'assignment_turned_in',
            href: '/post/published',
          },
          {
            text: 'Unpublished',
            icon: 'event',
            href: '/post/unpublished',
          },
        ]}
      />
      <TabSection>
        {isPageLoading ? (
          <div className='flex justify-center h-full items-center'>
            <Loading
              size='lg'
              className='text-gray-200'
            />
          </div>
        ) : (
          children
        )}
      </TabSection>
    </div>
  );
};

export default PostLayout;
