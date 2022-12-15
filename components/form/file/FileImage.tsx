import Image from 'next/image';
import { DragEvent, FC, useEffect, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import classNames from 'classnames';

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
  defaultValue?: string;
};

const FileImage: FC<Props> = ({
  label,
  helperText = '',
  name,
  disabled,
  isLoading,
}) => {
  const {
    control,
    register,
    watch,
    setValue,
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      setValue(name, e.dataTransfer.files[0]);
    }
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
          'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed cursor-pointer bg-gray-50 border-secondary-300 rounded-md shadow-sm px-4 py-2',
          {
            'focus:ring-primary-900 border-secondary-700 bg-secondary-100 focus:border-primary-900':
              dragActive,
            'focus:ring-error-300 border-error-300 focus:border-error-300':
              errors[name],
            'focus:ring-primary-500 border-secondary-300 focus:border-primary-500':
              !errors[name],
          }
        )}>
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          {typeof fileUploaded !== 'undefined' ? (
            <Image
              id={`${name}-preview`}
              src={
                typeof fileUploaded === 'string'
                  ? fileUploaded
                  : URL.createObjectURL(fileUploaded)
              }
              alt='Image Preview'
              className='w-80 h-52'
              width={300}
              height={200}
              priority
            />
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
          render={({ field: { onChange, ref } }) => (
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
                  onChange(event.target.files[0]);
                }
              }}
              disabled={disabled || isSubmitting}
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
