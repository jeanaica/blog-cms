import React, { FC } from 'react';

import Dropdown from 'components/dropdown/Dropdown';

const options = [
  { value: null, label: 'All' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'DRAFT', label: 'Draft' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'ARCHIVED', label: 'Archived' },
];

const sortOptions = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

type Props = {
  onChange(option: string, selectedOption: string | null): void;
};

const Header: FC<Props> = ({ onChange }) => {
  const handleStatusChange = (selectedOption: string | null) => {
    onChange('status', selectedOption);
  };

  const handleSortingChange = (selectedOption: string | null) => {
    onChange('sort', selectedOption);
  };

  return (
    <div className='flex justify-between flex-col gap-4 md:flex-row md:gap-8 mb-10'>
      <Dropdown
        label='Filter by status:'
        options={options}
        onChange={handleStatusChange}
        defaultValue={options[0]}
      />
      <Dropdown
        label='Sort:'
        options={sortOptions}
        onChange={handleSortingChange}
        defaultValue={sortOptions[0]}
      />
    </div>
  );
};

export default Header;
