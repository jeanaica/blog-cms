import classNames from 'classnames';
import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';

import FieldError from './FieldError';
import FieldErrorIcon from './FieldErrorIcon';
import FieldLabel from './FieldLabel';
import HelperText from './HelperText';

import formatDate from 'utils/formatDate';

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
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
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

        {errors[name] && <FieldErrorIcon />}
      </div>
      <div>
        <HelperText text={helperText} />
        <FieldError message={errors[name]?.message as string} />
      </div>
    </div>
  );
};

export default DatePicker;
