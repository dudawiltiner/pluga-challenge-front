import React from 'react';

import { ELEMENTS } from './SearchInput.enum';
import { SearchInputProps } from './SearchInput.types';

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <label className="input w-full" data-cy={ELEMENTS.SEARCH_INPUT}>
      <svg
        data-cy={ELEMENTS.SEARCH_INPUT_ICON}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4 opacity-50"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        data-cy={ELEMENTS.SEARCH_INPUT_FIELD}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
};

export default SearchInput;
