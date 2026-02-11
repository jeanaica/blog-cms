import { type FC } from 'react';

import Input from 'components/form/Input';
import MultiImageUpload from 'components/form/MultiImageUpload';

type Props = {
  index: number;
};

const GalleryBlock: FC<Props> = ({ index }) => {
  const fieldName = `contentBlocks.${index}.images`;
  const galleryNameField = `contentBlocks.${index}.galleryName`;

  return (
    <div className='w-full p-4 space-y-4'>
      <Input
        label='Gallery Name'
        name={galleryNameField}
        placeholder='Name this gallery'
        rules={{ required: 'Gallery name is required' }}
      />

      <MultiImageUpload
        name={fieldName}
        maxImages={10}
        showMetadata
      />
    </div>
  );
};

export default GalleryBlock;
