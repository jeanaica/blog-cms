import { DragEvent, FC, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import classNames from 'classnames';

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  defaultValue?: string;
};

const FileImage: FC<Props> = ({
  label,
  helperText = '',
  name,
  disabled,
  loading,
}) => {
  const {
    control,
    register,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const fileUploaded = watch(name);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleFile = (file?: File) => {
    if (!file) return;

    const maxFileSize = 10 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      setError(name, {
        message: 'Only .jpg, .jpeg, and .png formats are supported.',
      });
      return;
    }

    if (file.size > maxFileSize) {
      setError(name, { message: 'Max image size is 10MB.' });
      return;
    }

    setValue(name, file, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className='flex-col items-center justify-center w-full mb-4'>
      <div className='block text-sm font-semibold text-primary'>{label}</div>
      <label
        htmlFor={name}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={classNames(
          'flex flex-col items-center justify-center w-full h-64 border border-dashed cursor-pointer bg-gray-50 border-secondary-300 rounded-md shadow-sm px-4 py-2',
          {
            'focus:ring-primary-900 border-secondary-700 bg-secondary-100 focus:border-primary-900':
              dragActive,
            'focus:ring-error-300 border-error-300 focus:border-error-300':
              errors[name],
            'focus:ring-primary-500 border-secondary-300 focus:border-primary-500':
              !errors[name],
          }
        )}>
        <div className='flex flex-col items-center justify-center'>
          {fileUploaded ? (
            <div
              style={{
                width: '300px',
                paddingTop: 'calc(200 / 300 * 100%)',
                position: 'relative',
              }}>
              <img
                id={`${name}-preview`}
                src={
                  typeof fileUploaded === 'string'
                    ? fileUploaded
                    : fileUploaded instanceof File
                    ? URL.createObjectURL(fileUploaded)
                    : ''
                }
                alt='Image Preview'
                className='absolute top-0 left-0 w-full h-full object-contain m-0'
              />
            </div>
          ) : (
            <>
              <span className='material-icons-outlined text-gray-400 mb-3 text-[4rem]'>
                cloud_upload
              </span>
              <p className='mb-2 text-sm text-gray-500 text-center'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 text-center'>{helperText}</p>
            </>
          )}
        </div>

        <Controller
          control={control}
          name={name}
          render={({ field: { ref } }) => (
            <input
              {...register(name)}
              className='hidden'
              aria-describedby='file_input_help'
              ref={ref}
              id={name}
              name={name}
              type='file'
              accept='image/*'
              onChange={event => {
                if (event.target.files && event.target.files[0]) {
                  handleFile(event.target.files[0]);
                }
              }}
              disabled={disabled || isSubmitting || loading}
            />
          )}
        />
      </label>
      {errors[name] && (
        <span className='text-sm text-error-300'>{`${errors[name]?.message}`}</span>
      )}
    </div>
  );
};

export default FileImage;
