import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Archives.css';

const Archives = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialFilterType = queryParams.get('type') || 'All';

  const [archives, setArchives] = useState([]);
  const [filterType, setFilterType] = useState(initialFilterType);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const SECTIONS = ['Maps', 'Documents', 'Audio', 'Video'];

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://highlandhistories.org/api/archives?section=${filterType}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArchives(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching archives:", err);
        setError('Failed to load archives. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchives();
  }, [filterType]);

  useEffect(() => {
    const queryFilter = queryParams.get('type') || 'All';
    setFilterType(queryFilter);
  }, [location.search]);

  const renderArchiveItem = (archive) => {
    const hasThumbnail = archive.thumbnail && archive.thumbnail.trim() !== '';

    return (
      <div key={archive._id} className="archive-item">
        <div className="archive-thumbnail">
          {hasThumbnail ? (
            <img 
              src={archive.thumbnail} 
              alt={`${archive.title} thumbnail`} 
              className="archive-image"
            />
          ) : (
            <div className="no-preview">
              <span>No Preview Available</span>
            </div>
          )}
        </div>
        <div className="archive-content">
          <Link to={`/view-upload/${archive._id}`} className="archive-title">
            {archive.title}
          </Link>
          <p className="archive-description">
            <strong>Description:</strong> {archive.description}
          </p>
          <div className="archive-categories">
            <strong>Categories:</strong>{' '}
            {archive.categories.map((category, index) => (
              <span key={category} className="category-tag">
                {category}{index < archive.categories.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (section) => {
    const sectionArchives = archives.filter(archive => archive.section === section);
    
    if (sectionArchives.length === 0) {
      return null;
    }

    return (
      <div className="archive-section" key={section}>
        <h2 className="section-title">{section}</h2>
        <div className="archive-grid">
          {sectionArchives.map(renderArchiveItem)}
        </div>
      </div>
    );
  };

  const renderArchives = () => {
    if (isLoading) {
      return <div className="loading-spinner">Loading archives...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (archives.length === 0) {
      return <div className="no-archives">No archives found.</div>;
    }

    return filterType === 'All'
      ? SECTIONS.map(section => renderSection(section))
      : renderSection(filterType);
  };

  return (
    <div className="archives-container">
      <h1 className="page-title">Media Archives</h1>
      <select
        onChange={e => setFilterType(e.target.value)}
        value={filterType}
        className="filter-dropdown"
        aria-label="Filter archives by section"
      >
        <option value="All">All Types</option>
        {SECTIONS.map(section => (
          <option key={section} value={section}>{section}</option>
        ))}
      </select>
      {renderArchives()}
    </div>
  );
};

export default Archives;
