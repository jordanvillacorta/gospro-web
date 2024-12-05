import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchAreaButton.module.css';

interface SearchAreaButtonProps {
  onClick: () => void;
  isSearching?: boolean;
}

const SearchAreaButton: React.FC<SearchAreaButtonProps> = ({ onClick, isSearching = false }) => {
  return (
    <button
      className={styles.searchAreaButton}
      onClick={onClick}
      disabled={isSearching}
    >
      <Search size={16} />
      <span>{isSearching ? 'Searching...' : 'Search this area'}</span>
    </button>
  );
};

export default SearchAreaButton;