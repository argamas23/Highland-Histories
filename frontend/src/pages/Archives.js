import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Archives.css'

const Archives = () => {
    const [archives, setArchives] = useState([]);
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        const fetchArchives = async () => {
            const response = await fetch(`http://43.204.23.49/api/archives?section=${filterType}`);
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
                <h1>{section}</h1>
                {renderSection(section)}
            </div>
        ));
    } else {
        return renderSection(filterType);
    }
};

return (
    <div>
      <h1>Archives</h1>
      <select
        onChange={e => setFilterType(e.target.value)}
        value={filterType}
        className="filter-dropdown"
      >
        <option value="All">All Types</option>
        <option value="Maps">Maps</option>
        <option value="Documents">Documents</option>
        <option value="Audio">Audio</option>
        <option value="Video">Video</option>
      </select>
      {renderArchives()}
    </div>
  );
};

export default Archives;
