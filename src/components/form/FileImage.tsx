import { type DragEvent, type FC, useState, useCallback } from 'react';
import {
  type RegisterOptions,
  useFormContext,
  Controller,
} from 'react-hook-form';
import classNames from 'classnames';

import Icon from 'components/icon/Icon';

import FieldError from './FieldError';
import FieldLabel from './FieldLabel';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  rules?: RegisterOptions;
};

const FileImage: FC<Props> = ({
  label,
  helperText = 'PNG, JPG, JPEG or WEBP (MAX. 10MB)',
  name,
  disabled,
  readOnly,
  loading,
  rules,
}) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const isDisabled = disabled || readOnly || isSubmitting || loading;

  const handleDrag = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateFile = useCallback((file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Only .jpg, .png, and .webp formats are supported.');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Max image size is 10MB.');
      return false;
    }

    setFileError(null);
    return true;
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className='flex-col items-center justify-center w-full mb-4'>
          <FieldLabel>{label}</FieldLabel>
          <label
            htmlFor={`${name}-input`}
            onDragOver={!isDisabled ? handleDrag : undefined}
            onDragLeave={!isDisabled ? handleDrag : undefined}
            onDrop={
              !isDisabled
                ? e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    const file = e.dataTransfer.files[0];
                    if (file && validateFile(file)) onChange(file);
                  }
                : undefined
            }
            className={classNames(
              'flex flex-col items-center justify-center w-full h-64 border border-dashed cursor-pointer bg-gray-50 rounded-md shadow-sm px-4 py-2',
              {
                'border-secondary-700 bg-secondary-100': dragActive,
                'border-error-300': error || fileError,
                'border-secondary-300': !error && !fileError && !dragActive,
                'opacity-50 cursor-not-allowed': isDisabled,
              }
            )}>
            <div className='flex flex-col items-center justify-center'>
              {value ? (
                <img
                  src={
                    typeof value === 'string'
                      ? value
                      : value instanceof File
                        ? URL.createObjectURL(value)
                        : ''
                  }
                  alt='Image Preview'
                  className='max-h-56 max-w-full object-contain'
                />
              ) : (
                <>
                  <Icon
                    icon='cloud_upload'
                    size={64}
                    className='text-gray-400 mb-3'
                  />
                  <p className='mb-2 text-sm text-gray-500 text-center'>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                  <p className='text-xs text-gray-500 text-center'>
                    {helperText}
                  </p>
                </>
              )}
            </div>
            <input
              className='hidden'
              id={`${name}-input`}
              type='file'
              accept='image/jpeg,image/png,image/webp'
              onChange={e => {
                const file = e.target.files?.[0];
                if (file && validateFile(file)) onChange(file);
                e.target.value = '';
              }}
              disabled={isDisabled}
            />
          </label>
          <FieldError message={fileError || error?.message} />
        </div>
      )}
    />
  );
};

export default FileImage;
