import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditUpload.css';

const EditUpload = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fileDetails, setFileDetails] = useState({
        title: '',
        description: '',
        categories: [],
        location: '',
        date: '',
    });

    useEffect(() => {
        // Fetch the details of the file
        fetch(`https://highlandhistories.org/api/archives/${id}`)
            .then(response => response.json())
            .then(data => setFileDetails(data))
            .catch(error => console.error('Error fetching file details:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the update request
        fetch(`https://highlandhistories.org/api/archives/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileDetails)
        })
        .then(response => response.json())
        .then(() => navigate('/my-uploads'))
        .catch(error => console.error('Error updating file:', error));
    };

    const handleChange = (e) => {
        setFileDetails({ ...fileDetails, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="edit-file-form">
          <h1>Edit File</h1>
          <div className="form-group">
            <label>Title:</label>
            <input
              name="title"
              value={fileDetails.title}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={fileDetails.description}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Categories:</label>
            <input
              name="categories"
              value={fileDetails.categories.join(',')}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              name="location"
              value={fileDetails.location}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={fileDetails.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      );
};

export default EditUpload;
