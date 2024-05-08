import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 
import { loggedin } from '../globals';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery(''); // Resets the search input after submitting
  };

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          {token && <li><Link to="/archives">Archives</Link></li>}
          {token && <li><Link to="/upload">Upload</Link></li>}
          {token && <li><Link to="/my-uploads">My Uploads</Link></li>}
          {!token && <li><Link to="/login">Login</Link></li>}
        </ul>

        {token && <button onClick={handleLogout} className="btn btn-primary">LogOut</button>}

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
