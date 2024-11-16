import React from 'react';
import { Search, Loader } from 'lucide-react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  isSearching?: boolean;
}

const SearchBar = ({ value, onChange, onSearch, isSearching = false }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isSearching) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Try searching your city..."
          className={styles.searchInput}
          disabled={isSearching}
        />
        <button 
          type="submit" 
          className={styles.searchButton}
          disabled={isSearching || !value.trim()}
        >
          {isSearching ? (
            <Loader className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Search className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;