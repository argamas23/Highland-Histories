// import React , { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './ConfirmUpload.css'

// const ConfirmUpload = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const [section, setSection] = useState('');

//     const handleUpload = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('file', state.file);
//             formData.append('title', state.details.title);
//             formData.append('caption', state.details.caption);
//             formData.append('categories', JSON.stringify(state.details.categories));
//             formData.append('description', state.details.description);
//             formData.append('date', state.details.date);
//             formData.append('location', state.details.location);
//             formData.append('userId', localStorage.getItem('userId')); 
//             formData.append('url', `https://highlandhistories.org/uploads/${state.file.filename}`);  // Construct URL
//             // formData.append('section', state.details.section);
//             formData.append('section', section);
//             formData.append('fileType', state.file.type); // Add the file type to the FormData
//             // URL will be constructed in the backend
//             // formData.append('url', ''); 
//              // Log FormData for debugging
//         for (let key of formData.keys()) {
//             console.log(key, formData.get(key));  // Logs each key-value pair in the FormData
//         }

//         // Debugging: Log the FormData values
//         console.log('FormData values:', {
//             file: state.file,
//             title: state.details.title,
//             caption: state.details.caption,
//             categories: state.details.categories,
//             description: state.details.description,
//             date: state.details.date,
//             location: state.details.location,
//             userId: localStorage.getItem('userId'),
//             // url: `http://43.204.23.49/uploads/${state.file.filename}`,
//             section: state.details.section,
//             fileType: state.file.type

//         });

//             console.log('Hello from ConfirmUpload.js in frontend Folder : I am sending "formData"', formData)

//             const response = await fetch('https://highlandhistories.org/api/archives/upload', {
//                 method: 'POST',
//                 body: formData,
//                 credentials: 'include',
//                 headers: {
//                     'Accept': 'application/json',  // This header can help in some configurations
//                 },
//             });
//             if (!response.ok) throw new Error('Network response was not ok.');

//             const result = await response.json();
//             if (response.ok) {
//                 alert(`File upload successful: ${result.filename}`);
//                 navigate('/my-uploads');
//             } else {
//                 throw new Error(result.message || 'File upload failed');
//             }
//         } catch (error) {
//             alert('File upload failed: ${error.message}');
//             console.log('Upload error: Error Originated from Fronted Confirm Upload.js ', error);
//             console.error('Upload error', error);
//         }
//     };

//     return (
//         <div className="confirm-upload">
//           <h2>Confirm Upload</h2>
//           <p>Title: {state.details.title}</p>
//           <p>Caption: {state.details.caption}</p>
//           <p>Categories: {state.details.categories.join(',')}</p>
//           <p>Description: {state.details.description}</p>
//           <p>Date: {state.details.date}</p>
//           <p>Location: {state.details.location}</p>
//           <select
//             onChange={(e) => setSection(e.target.value)}
//             defaultValue="Select Section"
//             className="filter-dropdown"
//           >
//             <option value="">Select Section</option>
//             <option value="Maps">Maps</option>
//             <option value="Documents">Documents</option>
//             <option value="Audio">Audio</option>
//             <option value="Video">Video</option>
//           </select>
//           <button onClick={handleUpload} className="upload-btn">
//             Upload
//           </button>
//         </div>
//       );
// };

// export default ConfirmUpload;




















import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConfirmUpload.css';

const ConfirmUpload = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [section, setSection] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0); // Initialize upload progress state

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', state.file);
        formData.append('title', state.details.title);
        formData.append('caption', state.details.caption);
        formData.append('categories', JSON.stringify(state.details.categories));
        formData.append('description', state.details.description);
        formData.append('date', state.details.date);
        formData.append('location', state.details.location);
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('url', `https://highlandhistories.org/uploads/${state.file.filename}`);
        formData.append('section', section);
        formData.append('fileType', state.file.type);

        try {
            const response = await axios.post('https://highlandhistories.org/api/archives/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted); // Update progress
                }
            });

    //         if (response.status === 200) {
    //             alert(`File upload successful: ${response.data.filename}`);
    //             navigate('/my-uploads');
    //         } else {
    //             throw new Error(response.data.message || 'File upload failed');
    //         }
    //     } catch (error) {
    //         alert(`File upload failed: ${error.message}`);
    //         console.error('Upload error:', error);
    //     }
    // };

    if (response.status === 200) {
        // Wait till the progress is fully complete
        if (uploadProgress >= 100) {
            alert(`File upload successful: ${response.data.filename}`);
            navigate('/my-uploads');
        }
    } else {
        throw new Error('File upload failed');
    }
} catch (error) {
    alert(`File upload failed: ${error.response?.data?.message || error.message}`);
    console.error('Upload error:', error);
}
};

    return (
        <div className="confirm-upload">
            <h2>Confirm Upload</h2>
            <p>Title: {state.details.title}</p>
            <p>Caption: {state.details.caption}</p>
            <p>Categories: {state.details.categories.join(',')}</p>
            <p>Description: {state.details.description}</p>
            <p>Date: {state.details.date}</p>
            <p>Location: {state.details.location}</p>
            <select onChange={(e) => setSection(e.target.value)} defaultValue="Select Section" className="filter-dropdown">
                <option value="">Select Section</option>
                <option value="Maps">Maps</option>
                <option value="Documents">Documents</option>
                <option value="Audio">Audio</option>
                <option value="Video">Video</option>
            </select>
            {uploadProgress > 0 && <progress value={uploadProgress} max="100">{uploadProgress}%</progress>}
            <button onClick={handleUpload} disabled={uploadProgress !== 0 && uploadProgress < 100} className="upload-btn">
                {uploadProgress > 0 && uploadProgress < 100 ? `Uploading ${uploadProgress}%` : 'Upload'}
            </button>
        </div>
    );
};

export default ConfirmUpload;
