import { ReactElement } from 'react';

import Loading from 'components/loading/Loading';
import Tabs from 'components/tabs/Tabs';
import TabSection from 'components/tabs/TabSection';
import { usePageLoading } from 'lib/hooks/usePageLoading';

type Props = {
  children: ReactElement;
};

const CommentLayout = ({ children }: Props) => {
  const isPageLoading = usePageLoading();

  return (
    <div className='h-full w-full drop-shadow-md bg-white overflow-hidden flex flex-col'>
      <Tabs
        tabs={[
          {
            text: 'Unread',
            icon: 'mark_chat_unread',
            href: '/comment/unread',
          },
          {
            text: 'Read',
            icon: 'mark_chat_read',
            href: '/comment/read',
          },
          {
            text: 'Replies',
            icon: 'forum',
            href: '/comment/replies',
          },
        ]}
      />
      <TabSection>
        {isPageLoading ? (
          <div className='flex justify-center h-full items-center'>
            <Loading size='lg' />
          </div>
        ) : (
          children
        )}
      </TabSection>
    </div>
  );
};

export default CommentLayout;
