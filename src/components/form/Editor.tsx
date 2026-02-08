import classNames from 'classnames';
import { FC, lazy, Suspense } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = lazy(() => import('react-quill'));

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
  readOnly?: boolean;
  options?: Array<{ value: string; label: string }>;
  className?: string;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
    ['link', 'video'],
  ],
};

const Editor: FC<Props> = ({
  label,
  helperText = '',
  name,
  readOnly = false,
  disabled,
  isLoading,
  className,
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div className={classNames('w-full mb-4', className)}>
      <label
        htmlFor={name}
        className='block text-sm font-semibold text-primary'>
        {label}
      </label>
      <div className='relative mt-1 w-full'>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <Suspense fallback={<div className='min-h-[250px] bg-gray-100 animate-pulse' />}>
            <ReactQuill
              theme='snow'
              placeholder={'Write Content'}
              value={value}
              readOnly={readOnly || isSubmitting || isLoading || disabled}
              modules={modules}
              className={classNames('min-h-[250px]', {
                error: errors[name],
              })}
              onChange={text => {
                onChange(text);
              }}
            />
            </Suspense>
          )}
        />
      </div>
      <div>
        {helperText !== '' && (
          <p className='text-xs text-secondary-500'>{helperText}</p>
        )}
        {errors[name] && (
          <span className='text-sm text-error-300'>{`${errors[name]?.message}`}</span>
        )}
      </div>
    </div>
  );
};

export default Editor;
