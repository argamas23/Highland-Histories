import React, { useEffect, useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import './MyUploads.css';

const MyUploads = () => {
    const [uploads, setUploads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Assuming you're storing userId in localStorage
        const fetchMyUploads = async () => {
            try {
                
                const response = await fetch(`http://43.204.23.49/api/archives/user/${userId}/uploads`, {
                                        method: 'GET', // Method is GET by default, included for clarity
                                        // headers: {
                                        //     'Content-Type': 'application/json',
                                        //     'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use Bearer token for authorization
                                        // }
                                    });
                const data = await response.json();
                // setUploads(data.uploads);
                console.log(data);

                if (response.ok) {
                        setUploads(data||[]);
                    } else {
                        throw new Error(data.message || "Unable to fetch uploads");
                    }
            } catch (error) {
                console.error('Error loading your uploads:', error);
                alert('Error loading uploads: ' + error.message);
            }
        };

        fetchMyUploads();
    }, [navigate]);

    const handleDelete = async (id) => {
        
        try {
            const response = await fetch(`http://43.204.23.49/api/archives/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const { message } = await response.json();
                setUploads(uploads.filter(upload => upload._id !== id));
                alert(message);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete the file.');
            }
        } catch (error) {
            alert('Error deleting file: ' + error.message);
            console.error('Error deleting file:', error);
        }
    };

    const handleEdit = (fileId) => {
        navigate(`/edit-upload/${fileId}`);
    };

    return (
        <div className="container">
          <h1 className="heading">My Uploads</h1>
          {uploads.length > 0 ? (
            <ul>
              {uploads.map((upload) => (
                <li key={upload._id} className="upload-item">
                  <Link to={`/view-upload/${upload._id}`}>{upload.title}</Link>
                  <span> - {upload.section}</span>
                  <p>{upload.description}</p>
                  <button onClick={() => handleEdit(upload._id)}>Edit</button>
                  <button onClick={() => handleDelete(upload._id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No uploads found.</p>
          )}
        </div>
      );
};

export default MyUploads;

