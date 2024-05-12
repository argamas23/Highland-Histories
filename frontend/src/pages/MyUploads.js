// import React, { useEffect, useState } from 'react';
// import { useNavigate , Link} from 'react-router-dom';

// const MyUploads = () => {
//     const [uploads, setUploads] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userId = localStorage.getItem('userId'); // Assuming you're storing userId in localStorage
//         const fetchMyUploads = async () => {
//             try {
                
//                 const response = await fetch(`http://localhost:5000/api/archives/user/${userId}/uploads`, {
//                                         method: 'GET', // Method is GET by default, included for clarity
//                                         // headers: {
//                                         //     'Content-Type': 'application/json',
//                                         //     'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you use Bearer token for authorization
//                                         // }
//                                     });
//                 const data = await response.json();
//                 // setUploads(data.uploads);
//                 console.log(data);

//                 if (response.ok) {
//                         setUploads(data||[]);
//                     } else {
//                         throw new Error(data.message || "Unable to fetch uploads");
//                     }
//             } catch (error) {
//                 console.error('Error loading your uploads:', error);
//                 alert('Error loading uploads: ' + error.message);
//             }
//         };

//         fetchMyUploads();
//     }, [navigate]);

//     const handleDelete = async (id) => {
        
//         try {
//             const response = await fetch(`http://localhost:5000/api/archives/${id}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 const { message } = await response.json();
//                 setUploads(uploads.filter(upload => upload._id !== id));
//                 alert(message);
//             } else {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to delete the file.');
//             }
//         } catch (error) {
//             alert('Error deleting file: ' + error.message);
//             console.error('Error deleting file:', error);
//         }
//     };

//     const handleEdit = (fileId) => {
//         navigate(`/edit-upload/${fileId}`);
//     };

//     return (
//         <div>
//             <h1>My Uploads</h1>
            
//             {uploads.length > 0 ? (
//                 <ul>
//                     {uploads.map((upload) => (
//                         <li key={upload._id}>
//                             <Link to={`/view-upload/${upload._id}`}>{upload.title}</Link> 
//                         <span> - {upload.section}</span> 
//                             <h3>{upload.title}</h3>
//                             <p>{upload.description}</p>
//                             {/* {upload.filename.endsWith('.pdf') && (
//                                 <object data={upload.url} type="application/pdf" width="100%" height="600px">
//                                     <iframe src={upload.url} width="100%" height="600px">
//                                         <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
//                                     </iframe>
//                                 </object> */}

//                                 {upload.filename.endsWith('.pdf') && (
//                                 <object data={upload.url} type="application/pdf" width="100%" height="600px">
//                                     <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
//                                 </object>
//                             )}
//                             {upload.fileType.startsWith('audio/') && (
//                                 <audio controls src={upload.url}></audio>
//                             )}
//                             {upload.fileType.startsWith('video/') && (
//                                 <video controls src={upload.url}></video>
                            

//                             )}
//                             <button onClick={() => handleEdit(upload._id)}>Edit</button>
//                             <button onClick={() => handleDelete(upload._id)}>Delete</button>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No uploads found.</p>
//             )}
//         </div>
//     );
// };

// export default MyUploads;





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
                
                const response = await fetch(`http://localhost:5000/api/archives/user/${userId}/uploads`, {
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
            const response = await fetch(`http://localhost:5000/api/archives/${id}`, {
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
            {/* <ul>
                {uploads.map((upload) => (
                    <li key={upload.id}>
                        <h3>{upload.title}</h3>
                        <p>{upload.description}</p>
                        <button onClick={() => handleEdit(upload.id)}>Edit</button>
                        <button onClick={() => handleDelete(upload.id)}>Delete</button>
                    </li>
                ))}
            </ul> */}
            {/* {uploads.length > 0 ? (
                <ul>
                    {uploads.map((upload) => (
                        <li key={upload._id}>
                            <h3>{upload.title}</h3>
                            <p>{upload.description}</p>
                            <button onClick={() => handleEdit(upload._id)}>Edit</button>
                            <button onClick={() => handleDelete(upload._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No uploads found.</p>
            )} */}
            {uploads.length > 0 ? (
                <ul>
                    {uploads.map((upload) => (
                        <li key={upload._id}>
                            <h3>{upload.title}</h3>
                            <p>{upload.description}</p>
                            {upload.filename.endsWith('.pdf') && (
                                <object data={upload.url} type="application/pdf" width="100%" height="600px">
                                    <iframe src={upload.url} width="100%" height="600px">
                                        <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
                                    </iframe>
                                </object>
                            )}
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

