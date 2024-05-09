// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const MyUploads = () => {
// //     const [uploads, setUploads] = useState([]);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchUploads = async () => {
// //             try {
// //                 const response = await fetch('http://localhost:5000/api/archives/user-uploads?userId=defaultUserId'); // Replace with actual user ID
// //                 const result = await response.json();
// //                 if (Array.isArray(result)) {
// //                     setUploads(result);
// //                 } else {
// //                     setUploads([]);
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching uploads:', error);
// //                 setUploads([]);
// //             }
// //         };

// //         fetchUploads();
// //     }, []);

// //     const handleDelete = async (id) => {
// //         try {
// //             await fetch(`http://localhost:5000/api/archives/${id}`, { method: 'DELETE' });
// //             setUploads(uploads.filter(upload => upload._id !== id));
// //         } catch (error) {
// //             console.error('Error deleting upload:', error);
// //         }
// //     };

// //     const handleEdit = (id) => {
// //         navigate(`/edit-upload/${id}`);
// //     };

// //     const handleView = (url) => {
// //         window.open(url, '_blank');
// //     };

// //     return (
// //         <div>
// //             <h2>My Uploads</h2>
// //             <ul>
// //                 {uploads.length > 0 ? (
// //                     uploads.map((upload) => (
// //                         <li key={upload._id}>
// //                             <div>
// //                                 <strong>{upload.title}</strong>
// //                                 <p>{upload.description}</p>
// //                                 <button onClick={() => handleView(upload.url)}>View</button>
// //                                 <button onClick={() => handleEdit(upload._id)}>Edit</button>
// //                                 <button onClick={() => handleDelete(upload._id)}>Delete</button>
// //                             </div>
// //                         </li>
// //                     ))
// //                 ) : (
// //                     <li>No uploads found.</li>
// //                 )}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default MyUploads;

// import React, { useState, useEffect } from 'react';

// const MyUploads = () => {
//     const [uploads, setUploads] = useState([]);

//     useEffect(() => {
//         const fetchUploads = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/archives/my-uploads');
//                 const data = await response.json();
//                 setUploads(data);
//             } catch (error) {
//                 console.error('Error fetching uploads:', error);
//             }
//         };
//         fetchUploads();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/archives/${id}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 setUploads(uploads.filter(upload => upload._id !== id));
//             } else {
//                 console.error('Error deleting file:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error deleting file:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>My Uploads</h2>
//             <ul>
//                 {uploads.map(upload => (
//                     <li key={upload._id}>
//                         <div>
//                             <p>File: {upload.filename}</p>
//                             <p>Title: {upload.title}</p>
//                             <p>Caption: {upload.caption}</p>
//                             <p>Description: {upload.description}</p>
//                             <p>Location: {upload.location}</p>
//                             <p>Date: {upload.date}</p>
//                             <button onClick={() => handleDelete(upload._id)}>Delete</button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default MyUploads;






import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyUploads = () => {
    const [uploads, setUploads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyUploads = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/my-uploads', {
                    method: 'GET', // or 'credentials: 'include' if using sessions
                });
                const data = await response.json();
                setUploads(data.uploads);
            } catch (error) {
                console.error('Error loading your uploads:', error);
            }
        };

        fetchMyUploads();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/archives/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the file.');
            }
            setUploads(uploads.filter(upload => upload.id !== id));
            alert('File deleted successfully.');
        } catch (error) {
            alert('Error deleting file: ' + error.message);
        }
    };

    const handleEdit = (fileId) => {
        navigate(`/edit-upload/${fileId}`);
    };

    return (
        <div>
            <h1>My Uploads</h1>
            <ul>
                {uploads.map((upload) => (
                    <li key={upload.id}>
                        <h3>{upload.title}</h3>
                        <p>{upload.description}</p>
                        <button onClick={() => handleEdit(upload.id)}>Edit</button>
                        <button onClick={() => handleDelete(upload.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyUploads;

