import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyUploads = () => {
    const [uploads, setUploads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Replace with actual user ID
        const userId = 'dummyUserId';
        fetch(`http://localhost:5000/api/archives/user/${userId}/uploads`)
            .then(response => response.json())
            .then(data => setUploads(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    const handleEdit = (id) => {
        // Navigate to edit page or implement inline editing
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/archives/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(() => setUploads(uploads.filter(upload => upload._id !== id)))
            .catch(error => console.error('Delete error:', error));
    };

    return (
        <div>
            <h2>My Uploads</h2>
            <ul>
                {uploads.map(upload => (
                    <li key={upload._id}>
                        {upload.title} - {upload.date}
                        <button onClick={() => handleEdit(upload._id)}>Edit</button>
                        <button onClick={() => handleDelete(upload._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyUploads;
