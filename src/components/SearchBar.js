import React, { useState } from 'react';

function SearchBar({ value, onChange, onSearch }) {
    const [inputValue, setInputValue] = useState(value);

    // Handles input changes and updates the inputValue state
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);  // Optional: Keep syncing input with parent if needed
    };
    return (
        <div>
          <input
            type="text"
            placeholder="City / Zip"
            value={inputValue}
            onChange={handleInputChange}
            style={{
              padding: '10px',
              width: '60%',
              fontSize: '16px',
            }}
          />
            <button
            onClick={() => onSearch(inputValue)}  // Trigger the search onClick
            style={{
              padding: '10px',
              marginLeft: '10px',
              backgroundColor: '#007BFF',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>
      );
}

export default SearchBar;