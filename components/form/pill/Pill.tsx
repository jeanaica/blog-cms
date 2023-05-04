import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select, { MultiValue, StylesConfig } from 'react-select';

import MultiValueRemove from './MultiValueRemove';

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  options?: Array<{ value: string; label: string }>;
  readOnly?: boolean;
  onPillChange?(val: MultiValue<any>): void;
  hasRemovable?: boolean;
};

const pillStyles: StylesConfig<
  Array<{ value: string; label: string }>,
  true
> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  multiValue: styles => ({ ...styles, backgroundColor: '#b2b2b250' }),
  multiValueLabel: styles => ({
    ...styles,
    fontWeight: 'bold',
    paddingRight: 6,
  }),
  multiValueRemove: styles => ({
    ...styles,
    ':hover': {
      backgroundColor: '#b2b2b2',
    },
  }),
};

const Pill: FC<Props> = ({
  label,
  helperText = '',
  readOnly = false,
  name,
  disabled,
  loading,
  options = [],
  onPillChange,
  hasRemovable,
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div className='w-full mb-4'>
      <label
        htmlFor={name}
        className='block text-sm font-semibold text-primary'>
        {label}
      </label>
      <div className='relative mt-1 w-full'>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              ref={ref}
              instanceId={name}
              isMulti
              value={value}
              isDisabled={disabled || readOnly || isSubmitting}
              isLoading={loading}
              closeMenuOnSelect={false}
              styles={pillStyles}
              onChange={(val: MultiValue<any>) => {
                if (onPillChange) {
                  onPillChange(val);
                }

                onChange(val);
              }}
              options={options}
              hideSelectedOptions
              components={{
                MultiValueRemove: props => (
                  <MultiValueRemove
                    {...props}
                    hasRemovable={hasRemovable}
                  />
                ),
              }}
            />
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

export default Pill;
