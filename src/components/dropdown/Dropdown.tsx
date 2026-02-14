import { type FC, useId, useState, lazy, Suspense, useCallback } from 'react';
import { type SingleValue } from 'react-select';

// Lazy load react-select to reduce initial bundle size
const Select = lazy(() => import('react-select').then(module => ({ default: module.default })));

export interface OptionType {
  value: string | null;
  label: string;
}

interface Props {
  options: OptionType[];
  onChange: (val: string | null) => void;
  placeholder?: string;
  defaultValue?: SingleValue<OptionType>;
  label?: string;
}

const Dropdown: FC<Props> = ({
  options,
  placeholder,
  onChange,
  defaultValue,
  label,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(defaultValue ?? null);

  const handleChange = useCallback(
    (option: SingleValue<OptionType>) => {
      setSelectedOption(option);
      onChange(option?.value ?? null);
    },
    [onChange]
  );

  return (
    <div className='flex flex-col flex-1 md:w-40'>
      <span className='text-primary'>{label}</span>
      <Suspense fallback={<div className='h-10 bg-gray-100 animate-pulse rounded' />}>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          instanceId={useId()}
          className='flex-1'
        />
      </Suspense>
    </div>
  );
};

export default Dropdown;
