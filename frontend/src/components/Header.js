import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 
import { loggedin } from '../globals';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const [showResearchDropdown, setShowResearchDropdown] = useState(false); // State for Research dropdown
  const token = localStorage.getItem('token');
  const usertype = localStorage.getItem('user');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    localStorage.removeItem('user');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleResearchDropdownToggle = () => {
    setShowResearchDropdown(!showResearchDropdown);
  };

  const handleSectionClick = (section) => {
    navigate(`/archives/${section.toLowerCase()}`);
    setShowDropdown(false); // Close the dropdown after navigation
  };

  return (
    <header>
      <nav>
        <ul>
          <li className="home-menu" onMouseEnter={handleResearchDropdownToggle} onMouseLeave={handleResearchDropdownToggle}>
            <Link to="/">Home</Link>
            {showResearchDropdown && (
              <ul className="dropdown">
                <li><Link to="/research">Research Themes</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/events">Happenings</Link></li>
          {token && (
            <li className="archives-menu">
              <Link to="/archives">Archives</Link>
              <ul className="dropdown">
                <li><Link to="/archives?type=All">All Types</Link></li>
                <li><Link to="/archives?type=Maps">Maps</Link></li>
                <li><Link to="/archives?type=Documents">Documents</Link></li>
                <li><Link to="/archives?type=Audio">Audio</Link></li>
                <li><Link to="/archives?type=Video">Video</Link></li>
              </ul>
            </li>
          )}
          {token && <li><Link to="/upload">Upload</Link></li>}
          {token && <li><Link to="/my-uploads">My Uploads</Link></li>}
          {usertype === "Admin" && <li><Link to="/permission">Permission</Link></li>}
          {!token && <li><Link to="/login">Login</Link></li>}
        </ul>

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

        {token && <button onClick={handleLogout} className="logout smaller">LogOut</button>}
      </nav>
    </header>
  );
};

export default Header;
