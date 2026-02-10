import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import MultiImageUpload from 'components/form/MultiImageUpload';

type Props = {
  index: number;
};

const GalleryBlock: FC<Props> = ({ index }) => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const fieldName = `contentBlocks.${index}.images`;
  const galleryNameField = `contentBlocks.${index}.galleryName`;
  const galleryNameError = (errors as Record<string, any>)?.contentBlocks?.[index]?.galleryName;

  return (
    <div className='w-full p-4 space-y-4'>
      <div>
        <label
          htmlFor={`${galleryNameField}-input`}
          className='block text-sm font-semibold text-primary mb-1'>
          Gallery Name
        </label>
        <input
          {...register(galleryNameField, { required: 'Gallery name is required' })}
          id={`${galleryNameField}-input`}
          type='text'
          placeholder='Name this gallery'
          className={classNames(
            'border-b w-full md:px-4 py-2 outline-none focus:ring-0 focus:text-black',
            galleryNameError
              ? 'border-b-error-300'
              : 'border-b-secondary-300'
          )}
          disabled={isSubmitting}
        />
        {galleryNameError && (
          <span className='text-sm text-error-300 block mt-1'>
            {galleryNameError.message as string}
          </span>
        )}
      </div>

      <MultiImageUpload
        name={fieldName}
        maxImages={10}
        showMetadata
      />
    </div>
  );
};

export default GalleryBlock;
