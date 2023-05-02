import classNames from 'classnames';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import formatDate from 'shared/utils/formatDate';

type Props = {
  label: string;
  name: string;
  className?: string;
  readOnly?: boolean;
  placeholder?: string;
  helperText?: string;
  defaultValue?: string | Date;
  minDate?: string | Date;
};

const DatePicker: FC<Props> = ({
  name,
  label,
  className,
  readOnly = false,
  placeholder = '',
  helperText = '',
  defaultValue,
  minDate,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div className='mb-4'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold text-primary'>
        {label}
      </label>
      <div className='relative mt-1 w-full'>
        <div className='absolute left-0 flex items-center content-center py-2 pl-4'>
          <span className='self-center material-icons-outlined text-xl text-gray-500'>
            event
          </span>
        </div>
        <input
          {...register(name)}
          type='date'
          name={name}
          id={name}
          readOnly={readOnly}
          min={minDate ? formatDate(minDate) : undefined}
          defaultValue={defaultValue ? formatDate(defaultValue) : undefined}
          className={classNames(
            'border-secondary-300 border-b shadow-sm w-full py-[0.43rem] pl-12 pr-4 bg-gray-100',
            className,
            {
              'bg-secondary-100 focus:ring-0 cursor-not-allowed border-secondary-300 focus:border-secondary-300':
                readOnly || isSubmitting,
              'focus:ring-error-300 border-error-300 focus:border-error-300':
                !readOnly && errors[name],
              'focus:ring-primary-500 border-secondary-300 focus:border-primary-500':
                !readOnly && !errors[name],
            }
          )}
          placeholder={placeholder}
          aria-describedby={name}
          disabled={isSubmitting}
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

export default DatePicker;
