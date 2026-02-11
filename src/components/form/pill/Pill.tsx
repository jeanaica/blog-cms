import { type FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select, { type MultiValue, type StylesConfig } from 'react-select';

import FieldError from '../FieldError';
import FieldLabel from '../FieldLabel';
import HelperText from '../HelperText';

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
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
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
                MultiValueRemove: (props: any) => (
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
        <HelperText text={helperText} />
        <FieldError message={errors[name]?.message as string} />
      </div>
    </div>
  );
};

export default Pill;
