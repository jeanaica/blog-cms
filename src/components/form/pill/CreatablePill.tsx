import { type FC, lazy, Suspense } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { type MultiValue, type MultiValueRemoveProps, type StylesConfig } from 'react-select';

// Lazy load react-select/creatable to reduce initial bundle size
const CreatableSelect = lazy(() => import('react-select/creatable'));

import toTitleCase from 'utils/toTitleCase';

import FieldError from '../FieldError';
import FieldLabel from '../FieldLabel';
import HelperText from '../HelperText';
import MultiValueRemove from './MultiValueRemove';

type OptionType = { value: string; label: string };
type PillStyles = StylesConfig<OptionType, true>;

type Props = {
  label: string;
  helperText?: string;
  name: string;
  disabled?: boolean;
  loading?: boolean;
  options?: Array<OptionType>;
  readOnly?: boolean;
  hasRemovable?: boolean;
  onPillChange?: (value: MultiValue<OptionType>) => void;
  onCreateOption?: (value: string) => void;
};

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
            <Suspense fallback={<div className='h-10 bg-gray-100 animate-pulse rounded' />}>
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
                filterOption={(option: {
                  value: string;
                  label: string;
                  data: OptionType;
                }) => option.value !== value}
                components={{
                  MultiValueRemove: (props: MultiValueRemoveProps<OptionType, true>) => (
                    <MultiValueRemove
                      {...props}
                      hasRemovable={hasRemovable}
                    />
                  ),
                }}
              />
            </Suspense>
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
