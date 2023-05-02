import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { MultiValue, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';

import toTitleCase from 'shared/utils/toTitleCase';

import MultiValueRemove from './MultiValueRemove';

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  options?: Array<{ value: string; label: string }>;
  readOnly?: boolean;
  hasRemovable?: boolean;
  onPillChange?(val: MultiValue<any>): void;
};

type OptionType = { value: string; label: string };
type PillStyles = StylesConfig<OptionType, true>;

const pillStyles: PillStyles = {
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
  loading,
  options = [],
  hasRemovable,
  onPillChange,
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
          render={({ field: { value, onChange, ref } }) => (
            <CreatableSelect
              ref={ref}
              instanceId={name}
              isMulti
              value={value}
              isDisabled={disabled || readOnly || isSubmitting}
              isLoading={loading}
              closeMenuOnSelect={false}
              styles={pillStyles}
              onChange={val => {
                if (onPillChange) {
                  onPillChange(val);
                }
                onChange(val);
              }}
              onCreateOption={(inputValue: string) => ({
                label: toTitleCase(inputValue),
                value: inputValue.toLowerCase(),
              })}
              options={options}
              hideSelectedOptions
              filterOption={(
                option: FilterOptionOption<OptionType>,
                inputValue: string
              ) => option.value !== value}
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

export default CreatablePill;
