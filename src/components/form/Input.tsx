import { type FC } from 'react';
import classNames from 'classnames';
import { useFormContext, type RegisterOptions } from 'react-hook-form';

import { getNestedError } from 'utils/getNestedError';

import FieldError from './FieldError';
import FieldErrorIcon from './FieldErrorIcon';
import FieldLabel from './FieldLabel';
import HelperText from './HelperText';

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
  rules?: RegisterOptions;
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
  rules,
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const error = getNestedError(errors, name);

  return (
    <div className='w-full mb-4'>
      {label && (
        <FieldLabel
          htmlFor={name}
          className='mb-1'>
          {label}
        </FieldLabel>
      )}
      <div className='relative w-full h-full'>
        <input
          {...register(name, rules)}
          type={type}
          name={name}
          id={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          className={classNames(
            'border-b-secondary-300 border-b w-full md:px-4 py-2 outline-none focus:ring-0 focus:text-black disabled:cursor-not-allowed disabled:bg-gray-100 disabled:rounded-md read-only:bg-gray-100 ',
            className,
            {
              'border-b-error-300 text-error-300': !readOnly && error,
            }
          )}
          placeholder={placeholder}
          aria-describedby={name}
          disabled={disabled || readOnly || isSubmitting}
          autoComplete={
            readOnly
              ? 'off'
              : autoComplete ?? (type === 'password' ? 'current-password' : undefined)
          }
          data-lpignore={disabled || readOnly || undefined}
        />

        {error && <FieldErrorIcon />}
      </div>
      <div>
        <HelperText text={helperText} />
        <FieldError message={error?.message} />
      </div>
    </div>
  );
};

export default Input;
