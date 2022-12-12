import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
  options?: Array<{ value: string; label: string }>;
  readOnly?: boolean;
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

const CreatablePill: FC<Props> = ({
  label,
  helperText = '',
  readOnly = false,
  name,
  disabled,
  isLoading,
  options = [],
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
            <CreatableSelect
              ref={ref}
              instanceId={name}
              isMulti
              value={value}
              isDisabled={disabled || readOnly || isSubmitting}
              isLoading={isLoading}
              closeMenuOnSelect={false}
              styles={pillStyles}
              onChange={val => {
                const formatValue = val.map(v => ({
                  label: v.label.charAt(0).toUpperCase() + v.label.slice(1),
                  value: v.value.toLowerCase(),
                }));

                return onChange(formatValue);
              }}
              options={options}
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

export default CreatablePill;
