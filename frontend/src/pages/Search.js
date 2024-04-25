import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This custom hook simplifies the process of getting query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const performSearch = async () => {
      // Simulate a search function that filters mock data based on the search term
      const results = mockData.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSearchResults(results);
    };

    performSearch();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {searchResults.map(result => (
          <li key={result.id}>
            <h2>{result.title}</h2>
            <p>Tags: {result.tags.join(', ')}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
      {searchResults.length === 0 && <p>No results found for "{searchTerm}"</p>}
    </div>
  );
};

// Has to be Replaced with real data fetching logic later during back-end implementation
const mockData = [
  { id: 1, title: 'Historical Map', tags: ['geography', 'history'] },
  { id: 2, title: 'Ancient Manuscript', tags: ['manuscript', 'literature'] },
  { id: 3, title: 'Audio Recording', tags: ['oral history', 'british india'] },
 
];

export default Search;
