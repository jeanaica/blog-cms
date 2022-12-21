import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

type Props = {
  label: string;
  placeholder?: string;
  helperText?: string;
  name: string;
  readOnly?: boolean;
  className?: string;
  rows?: number;
};

const TextArea: FC<Props> = ({
  label,
  placeholder = '',
  helperText = '',
  name,
  readOnly = false,
  className,
  rows = 5,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return (
    <div className='w-full'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold text-primary text-left'>
        {label}
      </label>
      <div className='relative mt-1 w-full'>
        <textarea
          {...register(name)}
          rows={rows}
          name={name}
          id={name}
          readOnly={readOnly}
          className={classNames(
            'resize-none border-secondary-300 rounded-md flex-1 border shadow-sm w-full px-4 py-2',
            className,
            {
              'bg-secondary-100 focus:ring-0 cursor-not-allowed border-secondary-300 focus:border-secondary-300':
                readOnly,
              'focus:ring-error-300 border-error-300 focus:border-error-300':
                !readOnly && errors[name],
              'focus:ring-primary-500 border-secondary-300 focus:border-primary-500':
                !readOnly && !errors[name],
            }
          )}
          placeholder={placeholder}
          aria-describedby={name}
        />
      </div>
      {helperText !== '' && (
        <p className='text-xs text-secondary-500'>{helperText}</p>
      )}

      {errors[name] && (
        <span className='text-sm text-error-300'>{`${errors[name]?.message}`}</span>
      )}
    </div>
  );
};

export default TextArea;
