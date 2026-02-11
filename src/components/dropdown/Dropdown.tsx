import { type FC, useId, useState } from 'react';
import Select, { type SingleValue } from 'react-select';

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

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    onChange(option?.value ?? null);
  };

  return (
    <div className='flex flex-col flex-1 md:w-40'>
      <span className='text-primary'>{label}</span>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        instanceId={useId()}
        className='flex-1'
      />
    </div>
  );
};

export default Dropdown;
