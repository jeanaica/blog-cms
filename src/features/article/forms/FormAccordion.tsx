import Accordion from 'components/accordion/Accordion';

import Labels from './Labels';
import MetaForm from './MetaForm';
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
        content: <MetaForm />,
      },
      {
        title: 'Publish on',
        content: <PublishOn />,
      },
    ]}
  />
);

export default FormAccordion;
