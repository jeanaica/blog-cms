import { type FC } from 'react';

import FileImage from 'components/form/FileImage';
import Input from 'components/form/Input';

type Props = {
  index: number;
};

const SingleImageBlock: FC<Props> = ({ index }) => {
  const imageField = `contentBlocks.${index}.image`;
  const captionField = `contentBlocks.${index}.caption`;
  const altField = `contentBlocks.${index}.alt`;

  return (
    <div className='w-full p-4 space-y-4'>
      <FileImage
        label='Image'
        name={imageField}
        rules={{ required: 'Image is required' }}
      />

      <Input
        label='Caption'
        name={captionField}
        placeholder='Image caption (optional)'
      />

      <Input
        label='Alt text'
        name={altField}
        placeholder='Describe the image for accessibility (optional)'
      />
    </div>
  );
};

export default SingleImageBlock;
