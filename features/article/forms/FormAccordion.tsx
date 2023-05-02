import Accordion from 'components/accordion/Accordion';

import Labels from './Labels';
import Meta from './Meta';
import PublishOn from './PublishOn';

const FormAccordion = () => (
  <Accordion
    className='relative z-10'
    items={[
      {
        title: 'Labels',
        content: <Labels />,
      },
      {
        title: 'Meta',
        content: <Meta />,
      },
      {
        title: 'Publish on',
        content: <PublishOn />,
      },
    ]}
  />
);

export default FormAccordion;
