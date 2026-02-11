import { type FC } from 'react';

import Editor from 'components/form/Editor';

const isContentEmpty = (value?: string) =>
  !value ||
  value === '<p><br></p>' ||
  value.replace(/<[^>]*>/g, '').trim() === '';

type Props = {
  index: number;
};

const TextBlock: FC<Props> = ({ index }) => {
  const fieldName = `contentBlocks.${index}.content`;

  return (
    <div className='w-full'>
      <Editor
        name={fieldName}
        placeholder='Write content...'
        rules={{
          validate: value => !isContentEmpty(value) || 'Content is required',
        }}
      />
    </div>
  );
};

export default TextBlock;
