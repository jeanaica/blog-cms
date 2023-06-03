import React, { FC } from 'react';

import Dropdown from 'components/Dropdown';

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
    <div className='flex justify-between flex-col gap-4 md:flex-row md:gap-8 sticky top-0 pt-8 pb-4 px-8 bg-slate-50 z-20'>
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
