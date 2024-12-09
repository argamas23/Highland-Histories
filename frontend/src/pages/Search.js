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

        // Split search term into an array of parameters, trimming whitespace
        const searchParams = searchTerm.split(',').map(param => param.trim().toLowerCase());

        const response = await fetch(`https://highlandhistories.org/api/archives?query=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();

        // Filter results based on multiple search parameters
        const results = data.filter(item =>
          searchParams.some(param =>
            item.title.toLowerCase().includes(param) ||
            item.categories.some(tag => tag.toLowerCase().includes(param)) ||
            item.section.toLowerCase().includes(param) ||
            item.location.toLowerCase().includes(param)
          )
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
