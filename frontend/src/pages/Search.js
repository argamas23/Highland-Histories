import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Search.css'; // Import the CSS file

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const query = useQuery();
  const searchTerm = query.get('query');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (!searchTerm) {
          setSearchResults([]);
          return;
        }

        const response = await fetch(`http://43.204.23.49/api/archives?query=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        const results = data.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.categories.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {searchResults.map(result => (
          <li key={result._id} className="search-result">
            <Link to={`/view-upload/${result._id}`}>
              <h2>{result.title}</h2>
            </Link>
            <p><b>Description: </b>{result.description}</p>
            <p><b>Tags: </b>{result.categories.join(', ')}</p>
          </li>
        ))}
      </ul>
      {searchResults.length === 0 && <p>No results found for "{searchTerm}"</p>}
    </div>
  );
};

export default Search;