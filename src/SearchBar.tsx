import React, { useState, useEffect } from 'react';
import { FormControl } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  return (
    <FormControl
      type="text"
      placeholder="Search for books..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;
