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
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='w-full mb-4'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold text-primary'>
        {label}
      </label>
      <div className='relative mt-1 w-full'>
        <input
          {...register(name)}
          type={type}
          name={name}
          id={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          className={classNames(
            'border-secondary-300 border rounded-md shadow-sm w-full px-4 py-2',
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
