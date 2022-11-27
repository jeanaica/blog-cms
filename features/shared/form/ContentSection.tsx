import { FC } from 'react';

import TabSection from 'components/tabs/TabSection';
import Editor from 'components/form/editor/Editor';

type Props = {
  active?: boolean;
};

const ContentSection: FC<Props> = ({ active }) => {
  return (
    <form>
      <TabSection
        active={active}
        isSamePage>
        <Editor
          label=''
          name='content'
        />
      </TabSection>
    </form>
  );
};

export default ContentSection;
