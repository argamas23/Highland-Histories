import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FileDetails.css';

const FileDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    title: '',
    caption: '',
    categories: [],
    description: '',
    date: '',
    location: '',
    section: '', // State to track selected section
    mapType: '', // State to track type of map, image, or scan
    interviewer: [], // Changed to array
    interviewee: [], // Changed to array
    userId: localStorage.getItem('userId'), // Fetch userId from localStorage
  });

  useEffect(() => {
    if (!location.state || !location.state.file) {
      navigate('/upload'); // Redirect back if no file is in state
    }
  }, [location, navigate]);

  const handleChange = (key, value) => {
    setDetails((prevDetails) => ({ ...prevDetails, [key]: value }));
  };

  const handleSubmit = () => {
    console.log(details);
    navigate('/confirm-upload', {
      state: { details, file: location.state.file },
    });
  };

  return (
    <div className="file-details-container">
      <h2>File Details</h2>
      <div className="input-container">
        <label>Section:</label>
        <br />
        <select
          onChange={(e) => handleChange('section', e.target.value)}
          value={details.section}
          className="filter-dropdown"
        >
          <option value="">Select Section</option>
          <option value="Maps">Maps</option>
          <option value="Documents">Documents</option>
          <option value="Audio">Audio</option>
          <option value="Video">Video</option>
        </select>
      </div>
      
      {details.section === 'Maps' && (
        <div className="input-container">
          <label>Type:</label>
          <br />
          <select
            onChange={(e) => handleChange('mapType', e.target.value)}
            value={details.mapType}
            className="filter-dropdown"
          >
            <option value="">Select Type</option>
            <option value="Map">Map</option>
            <option value="Image">Image</option>
            <option value="Scan">Scan</option>
          </select>
        </div>
      )}

      {(details.section === 'Audio' || details.section === 'Video') && (
        <>
          <div className="input-container">
            <label>Name of Interviewer:</label>
            <br />
            <input
              type="text"
              value={details.interviewer.join(',')} // Convert array to a comma-separated string
              onChange={(e) =>
                handleChange('interviewer', e.target.value.split(','))
              }

              className="input-field"
            />
          </div>
          <div className="input-container">
            <label>Name of Interviewee:</label>
            <br />
            <input
              type="text"
              value={details.interviewee.join(',')} // Convert array to a comma-separated string
              onChange={(e) =>
                handleChange('interviewee', e.target.value.split(','))
              }
              className="input-field"
            />
          </div>
        </>
      )}

      <div className="input-container">
        <label>Title:</label>
        <br />
        <input
          type="text"
          value={details.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label>Caption:</label>
        <br />
        <input
          type="text"
          value={details.caption}
          onChange={(e) => handleChange('caption', e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label>Categories:</label>
        <br />
        <input
          type="text"
          value={details.categories.join(',')}
          onChange={(e) =>
            handleChange('categories', e.target.value.split(','))
          }
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label>Description:</label>
        <br />
        <textarea
          value={details.description}
          onChange={(e) => handleChange('description', e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label>Date:</label>
        <br />
        <input
          type="date"
          value={details.date}
          onChange={(e) => handleChange('date', e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label>Location:</label>
        <br />
        <input
          type="text"
          value={details.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="input-field"
        />
      </div>

      <button onClick={handleSubmit} className="submit-button">
        Next
      </button>
    </div>
  );
};

export default FileDetails;
