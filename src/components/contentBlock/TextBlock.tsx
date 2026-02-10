import classNames from 'classnames';
import { type FC, lazy, Suspense, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import 'react-quill/dist/quill.snow.css';

const ReactQuill = lazy(() => import('react-quill'));

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

const isContentEmpty = (value?: string) =>
  !value || value === '<p><br></p>' || value.replace(/<[^>]*>/g, '').trim() === '';

type Props = {
  index: number;
};

const TextBlock: FC<Props> = ({ index }) => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  const [touched, setTouched] = useState(false);

  const fieldName = `contentBlocks.${index}.content`;

  return (
    <div className='w-full'>
      <Controller
        control={control}
        name={fieldName}
        rules={{
          validate: value =>
            !isContentEmpty(value) || 'Content is required',
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Suspense
              fallback={
                <div className='min-h-[250px] bg-gray-100 animate-pulse' />
              }>
              <ReactQuill
                theme='snow'
                placeholder='Write content...'
                value={value || ''}
                readOnly={isSubmitting}
                modules={modules}
                className={classNames('min-h-[250px]', {
                  error: touched && error,
                })}
                onChange={text => onChange(text)}
                onBlur={() => setTouched(true)}
              />
            </Suspense>
            {touched && error && (
              <span className='text-sm text-error-300 px-3 py-1 block'>
                {error.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TextBlock;
