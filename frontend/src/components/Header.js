// import React from 'react';
// import { Link } from 'react-router-dom';
import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    // Resets the search input after submitting
    setSearchQuery(''); 
  };


  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/archives">Archives</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/my-uploads">My Uploads</Link></li>
          <li><Link to="/login">Login</Link></li>
          {/* <li><Link to="/register">Register</Link></li> */}
        </ul>

        {/* <form onSubmit={handleSearch}>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <button type="submit">Search</button>
        </form> */}

<form onSubmit={handleSearch} className="search-form">
  <input
    type="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search..."
    className="search-input"
  />
  <button type="submit" className="search-button">Search</button>
</form>


      </nav>
    </header>
  );
}

export default Header;
