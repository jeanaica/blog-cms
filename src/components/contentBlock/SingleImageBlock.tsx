import { type DragEvent, type FC, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import classNames from 'classnames';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

type Props = {
  index: number;
};

const SingleImageBlock: FC<Props> = ({ index }) => {
  const {
    control,
    register,
    formState: { isSubmitting },
  } = useFormContext();

  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const imageField = `contentBlocks.${index}.image`;
  const captionField = `contentBlocks.${index}.caption`;
  const altField = `contentBlocks.${index}.alt`;

  const handleDrag = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (
    file: File | undefined,
    onChange: (value: File) => void
  ) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Only .jpg, .png, and .webp formats are supported.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Max image size is 10MB.');
      return;
    }

    setFileError(null);
    onChange(file);
  };

  return (
    <div className='w-full p-4 space-y-4'>
      <Controller
        control={control}
        name={imageField}
        rules={{ required: 'Image is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <label
              htmlFor={`${imageField}-input`}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={e => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(false);
                validateAndSetFile(e.dataTransfer.files[0], onChange);
              }}
              className={classNames(
                'flex flex-col items-center justify-center w-full h-64 border border-dashed cursor-pointer bg-gray-50 rounded-md px-4 py-2',
                {
                  'border-secondary-700 bg-secondary-100': dragActive,
                  'border-error-300': error || fileError,
                  'border-secondary-300': !error && !fileError && !dragActive,
                }
              )}>
              <div className='flex flex-col items-center justify-center'>
                {value ? (
                  <div
                    className='relative w-full max-w-[300px]'
                    style={{ paddingTop: 'calc(200 / 300 * 100%)' }}>
                    <img
                      src={
                        typeof value === 'string'
                          ? value
                          : value instanceof File
                          ? URL.createObjectURL(value)
                          : ''
                      }
                      alt='Image Preview'
                      className='absolute top-0 left-0 w-full h-full object-contain'
                    />
                  </div>
                ) : (
                  <>
                    <span className='material-icons-outlined text-gray-400 mb-3 text-[4rem]'>
                      cloud_upload
                    </span>
                    <p className='mb-2 text-sm text-gray-500 text-center'>
                      <span className='font-semibold'>Click to upload</span> or
                      drag and drop
                    </p>
                    <p className='text-xs text-gray-500 text-center'>
                      PNG, JPG, JPEG or WEBP (MAX. 10MB)
                    </p>
                  </>
                )}
              </div>
              <input
                className='hidden'
                id={`${imageField}-input`}
                type='file'
                accept='image/jpeg,image/png,image/webp'
                onChange={e => {
                  if (e.target.files?.[0]) {
                    validateAndSetFile(e.target.files[0], onChange);
                  }
                }}
                disabled={isSubmitting}
              />
            </label>
            {(fileError || error) && (
              <span className='text-sm text-error-300 block mt-1'>
                {fileError || error?.message}
              </span>
            )}
          </div>
        )}
      />

      <div>
        <label
          htmlFor={`${captionField}-input`}
          className='block text-sm font-semibold text-primary mb-1'>
          Caption
        </label>
        <input
          {...register(captionField)}
          id={`${captionField}-input`}
          type='text'
          placeholder='Image caption (optional)'
          className='border-b-secondary-300 border-b w-full md:px-4 py-2 outline-none focus:ring-0 focus:text-black'
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor={`${altField}-input`}
          className='block text-sm font-semibold text-primary mb-1'>
          Alt text
        </label>
        <input
          {...register(altField)}
          id={`${altField}-input`}
          type='text'
          placeholder='Describe the image for accessibility (optional)'
          className='border-b-secondary-300 border-b w-full md:px-4 py-2 outline-none focus:ring-0 focus:text-black'
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default SingleImageBlock;
