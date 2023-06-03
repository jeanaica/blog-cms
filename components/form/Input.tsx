import { FC } from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

type Props = {
  label: string;
  placeholder?: string;
  helperText?: string;
  name: string;
  type?: 'text' | 'password' | 'number';
  readOnly?: boolean;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  autoComplete?: string;
};

const Input: FC<Props> = ({
  label,
  placeholder = '',
  helperText = '',
  name,
  type = 'text',
  readOnly = false,
  className,
  defaultValue,
  disabled,
  autoComplete,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div className='w-full mb-4'>
      {label && (
        <label
          htmlFor={name}
          className='block text-sm font-semibold text-primary mb-1'>
          {label}
        </label>
      )}
      <div className='relative w-full h-full'>
        <input
          {...register(name)}
          type={type}
          name={name}
          id={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          className={classNames(
            'border-b-secondary-300 border-b w-full md:px-4 py-2 outline-none focus:ring-0 focus:text-black disabled:cursor-not-allowed disabled:bg-gray-100 disabled:rounded-md read-only:bg-gray-100 ',
            className,
            {
              'border-b-error-300 text-error-300': !readOnly && errors[name],
            }
          )}
          placeholder={placeholder}
          aria-describedby={name}
          disabled={disabled || isSubmitting}
          autoComplete={
            type === 'password' && autoComplete ? autoComplete : 'password'
          }
        />

        {errors[name] && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
            <span className='material-icons-outlined text-xl text-error-300'>
              error_outline
            </span>
          </div>
        )}
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

export default Input;
