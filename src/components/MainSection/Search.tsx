import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className="search">
        <div className="search-input-container">
          <img src="searchIcon.svg" alt="Search Icon" className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie or TV show..."
            className="search-input"
          />
        </div>
      </div>
    </>
  );
};

export default Search;
