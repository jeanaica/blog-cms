import { type FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { type MultiValue, type StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import toTitleCase from 'utils/toTitleCase';

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
  hasRemovable?: boolean;
  onPillChange?(val: MultiValue<any>): void;
  onCreateOption?(inputValue: string): void;
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
  onCreateOption,
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const handleCreate = (inputValue: string) => {
    if (onCreateOption) {
      onCreateOption(inputValue);
    }

    return {
      label: toTitleCase(inputValue),
      value: inputValue.toUpperCase(),
    };
  };

  return (
    <div className='w-full mb-4'>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
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
              onChange={(val: MultiValue<OptionType>) => {
                if (onPillChange) {
                  onPillChange(val);
                }
                onChange(val);
              }}
              onCreateOption={handleCreate}
              options={options}
              hideSelectedOptions
              filterOption={(
                option: { value: string; label: string },
                _inputValue: string
              ) => option.value !== value}
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

export default CreatablePill;
