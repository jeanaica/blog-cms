import React, { useEffect, useId, useState } from 'react';
import Select, { SingleValue } from 'react-select';

export interface OptionType {
  value: string | null;
  label: string;
}

interface Props {
  options: OptionType[];
  onChange: (value: string | null) => void;
  placeholder?: string;
  defaultValue?: SingleValue<OptionType>;
}

const Dropdown: React.FC<Props> = ({
  options,
  placeholder,
  onChange,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType>>(null);

  const handleChange = (option: SingleValue<OptionType>) => {
    setSelectedOption(option);
    onChange(option?.value ?? null);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      instanceId={useId()}
      className='flex-1 md:w-40'
    />
  );
};

export default Dropdown;
