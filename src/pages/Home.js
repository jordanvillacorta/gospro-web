import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');  // New state to hold search query

  // Handles the search click event and sets the search query
  const handleSearchClick = (query) => {
    setSearchQuery(query);  // Trigger the search by setting searchQuery
  };

  return (
    <div>
      <Navbar />
      <div style={{
        backgroundColor: '#623b35',
        color: 'white',
        height: '100vh', // 100% of viewport height
        width: '100vw', // 100% of viewport width
        display: 'flex', // Aligns items in the center
        flexDirection: 'column', // Stacks items vertically
        justifyContent: 'center', // Centers items vertically
        alignItems: 'center', // Centers items horizontally
      }}>
        <div>GO 'SPRO</div>
        <div>Find Local Craft Coffee Near You</div>
        <SearchBar value={searchTerm} onChange={setSearchTerm} onSearch={handleSearchClick}/>
        <div>some espresso for my depresso</div>
      </div>
    </div>
  );
};

export default Home;
