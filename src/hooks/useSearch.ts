import { useState } from 'react';
import { useMapSearch } from './useMapSearch';
import { Shop } from '../types/shop';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<Shop[]>([]);
  const { isSearching, selectedLocation, handleSearch } = useMapSearch();

  const handleSearchSubmit = async (query: string) => {
    const results = await handleSearch(query);
    setSearchResults(results);
    setHasSearched(true);
  };

  return {
    searchTerm,
    setSearchTerm,
    hasSearched,
    setHasSearched,
    isSearching,
    searchResults,
    setSearchResults,
    selectedLocation,
    handleSearchSubmit
  };
};