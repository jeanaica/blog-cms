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
  { value: 'ASC', label: 'Oldest first' },
  { value: 'DESC', label: 'Newest first' },
];

type Props = {
  onChange(selectedOption: string | null): void;
};

const Header: FC<Props> = ({ onChange }) => {
  return (
    <div className='flex justify-between mb-10'>
      <Dropdown
        options={options}
        onChange={onChange}
        defaultValue={options[0]}
      />
      <Dropdown
        placeholder='Sort By:'
        options={sortOptions}
        onChange={onChange}
      />
    </div>
  );
};

export default Header;
