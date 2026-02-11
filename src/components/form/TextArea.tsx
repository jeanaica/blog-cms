import { type FC, type TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import FieldError from './FieldError';
import FieldLabel from './FieldLabel';
import HelperText from './HelperText';

type Props = {
  label: string;
  helperText?: string;
  name: string;
  className?: string;
  isSubmitting?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: FC<Props> = props => {
  const {
    label,
    helperText = '',
    name,
    className,
    rows = 5,
    readOnly,
    disabled,
    isSubmitting,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='w-full mb-4'>
      {label && (
        <FieldLabel htmlFor={name} className='text-left mb-1'>{label}</FieldLabel>
      )}
      <div className='relative w-full h-full'>
        <textarea
          {...register(name)}
          {...props}
          rows={rows}
          id={name}
          readOnly={readOnly}
          className={classNames(
            'resize-none border-b-secondary-300 border-b w-full py-2 outline-none focus:ring-0 focus:text-black disabled:cursor-not-allowed disabled:bg-secondary-100 read-only:bg-secondary-100',
            className,
            {
              'border-b-error-300 text-error-300': !readOnly && errors[name],
            }
          )}
          aria-describedby={name}
          disabled={disabled || isSubmitting}
        />
      </div>
      <HelperText text={helperText} />
      <FieldError message={errors[name]?.message as string} />
    </div>
  );
};

export default TextArea;
