import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Archives.css'

const Archives = () => {
  const [archives, setArchives] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typeFromUrl = queryParams.get('type');
    if (typeFromUrl) {
      setFilterType(typeFromUrl);
    } else {
      setFilterType('All'); // Default to 'All' if no type is specified in the URL
    }
  }, [location]);

  useEffect(() => {
    const fetchArchives = async () => {
      const response = await fetch(`https://highlandhistories.org/api/archives?section=${filterType}`);
      const data = await response.json();
      if (response.ok) {
        setArchives(data);
      } else {
        console.error("Error fetching archives:", response.statusText);
      }
    };
    fetchArchives();
  }, [filterType]);

  const renderSection = (section) => {
    return archives.filter(archive => archive.section === section).map(archive => (
      <div key={archive._id} className="archive-item">
        <Link to={`/view-upload/${archive._id}`}>
          {archive.previewUrl ? (
            <img src={archive.previewUrl} alt={archive.title} className="archive-preview" />
          ) : (
            <div className="no-preview">No Preview Available</div>
          )}
          <h3>{archive.title}</h3>
        </Link>
        <p><b>Description: </b>{archive.description}</p>
        <p><b>Categories: </b>{archive.categories.join(', ')}</p>
      </div>
    ));
  };

  const renderArchives = () => {
    if (filterType === 'All') {
      const sections = ['Maps', 'Documents', 'Audio', 'Video'];
      return sections.map(section => (
        <div key={section}>
          <h2>{section}</h2>
          {renderSection(section)}
        </div>
      ));
    } else {
      return renderSection(filterType);
    }
  };

  return (
    <div className="archives-container">
      <h1>Archives: {filterType}</h1>
      {renderArchives()}
    </div>
  );
};

export default Archives;