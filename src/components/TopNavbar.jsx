import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Track search visibility

  // When search term changes, call onSearch
  useEffect(() => {
    if (searchTerm === '') {
      onSearch(''); // If the search term is empty, reset search results
    }
  }, [searchTerm, onSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (onSearch) {
        onSearch(searchTerm); // Call onSearch with the search term
      }
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSearchBar = () => {
    setIsSearchVisible(false); // Hide search bar
    setSearchTerm(''); // Clear the search term immediately when closing
  };

  return (
    <div className="top-navbar">
      {/* Biểu tượng faTv chỉ hiển thị khi search bar không hiển thị */}
      {!isSearchVisible && <FontAwesomeIcon icon={faTv} className="icon" />}
      
      {!isSearchVisible && (
        <h2>
          Following | <span>For You</span>
        </h2>
      )}

      {/* Search icon, visible when the search bar is hidden */}
      {!isSearchVisible && (
        <div className="search-icon" onClick={toggleSearchBar}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}

      {/* Search input, visible when the search bar is toggled */}
      {isSearchVisible && (
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyPress}
            placeholder="Search"
            className="search-input"
          />
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={closeSearchBar} // Close search bar and clear the search term
          />
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
