// import React from 'react';
// import { useLocation, useHistory } from 'react-router-dom';

// const ConfirmUpload = () => {
//     const { state } = useLocation();
//     const history = useHistory();

//     const handleUpload = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('file', state.file);
//             formData.append('title', state.details.title);
//             formData.append('caption', state.details.caption);
//             formData.append('categories', JSON.stringify(state.details.categories));
//             formData.append('description', state.details.description);
//             formData.append('date', state.details.date);
//             formData.append('location', state.details.location.value);

//             const response = await fetch('http://localhost:5000/api/archives/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 alert(`File upload successful: ${result.filename}`);
//                 history.push('/my-uploads');
//             } else {
//                 throw new Error(result.message || 'File upload failed');
//             }
//         } catch (error) {
//             alert('File upload failed');
//             console.error('Upload error', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Confirm Upload</h2>
//             <p>Title: {state.details.title}</p>
//             <p>Caption: {state.details.caption}</p>
//             <p>Categories: {state.details.categories.join(', ')}</p>
//             <p>Description: {state.details.description}</p>
//             <p>Date: {state.details.date}</p>
//             <p>Location: {state.details.location.label}</p>
//             <button onClick={handleUpload}>Upload</button>
//         </div>
//     );
// };

// export default ConfirmUpload;

// // import React from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';

// // const ConfirmUpload = () => {
// //     const { state } = useLocation();
// //     const navigate = useNavigate();

// //     const handleUpload = async () => {
// //         try {
// //             const formData = new FormData();
// //             formData.append('file', state.file);
// //             formData.append('title', state.details.title);
// //             formData.append('caption', state.details.caption);
// //             formData.append('categories', JSON.stringify(state.details.categories));
// //             formData.append('description', state.details.description);
// //             formData.append('date', state.details.date);
// //             formData.append('location', state.details.location.value);

// //             const response = await fetch('http://localhost:5000/api/archives/upload', {
// //                 method: 'POST',
// //                 body: formData,
// //             });

// //             const result = await response.json();
// //             if (response.ok) {
// //                 alert(`File upload successful: ${result.filename}`);
// //                 navigate('/my-uploads');
// //             } else {
// //                 throw new Error(result.message || 'File upload failed');
// //             }
// //         } catch (error) {
// //             alert('File upload failed');
// //             console.error('Upload error', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>Confirm Upload</h2>
// //             <p>Title: {state.details.title}</p>
// //             <p>Caption: {state.details.caption}</p>
// //             <p>Categories: {state.details.categories.join(', ')}</p>
// //             <p>Description: {state.details.description}</p>
// //             <p>Date: {state.details.date}</p>
// //             <p>Location: {state.details.location.label}</p>
// //             <button onClick={handleUpload}>Upload</button>
// //         </div>
// //     );
// // };

// // export default ConfirmUpload;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmUpload = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', state.file);
            formData.append('title', state.details.title);
            formData.append('caption', state.details.caption);
            formData.append('categories', JSON.stringify(state.details.categories));
            formData.append('description', state.details.description);
            formData.append('date', state.details.date);
            formData.append('location', state.details.location);
            formData.append('userId', localStorage.getItem('userId')); 
            formData.append('url', `http://localhost:5000/uploads/${state.file.filename}`);  // Construct URL

            console.log('Hello from ConfirmUpload.js in frontend Folder : I am sending "formData"', formData)

            const response = await fetch('http://localhost:5000/api/archives/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',  // This header can help in some configurations
                },
            });
            if (!response.ok) throw new Error('Network response was not ok.');

            const result = await response.json();
            if (response.ok) {
                alert(`File upload successful: ${result.filename}`);
                navigate('/my-uploads');
            } else {
                throw new Error(result.message || 'File upload failed');
            }
        } catch (error) {
            alert('File upload failed: ${error.message}');
            console.log('Upload error: Error Originated from Fronted Confirm Upload.js ', error);
            console.error('Upload error', error);
        }
    };

    return (
        <div>
            <h2>Confirm Upload</h2>
            <p>Title: {state.details.title}</p>
            <p>Caption: {state.details.caption}</p>
            <p>Categories: {state.details.categories.join(',')}</p>
            <p>Description: {state.details.description}</p>
            <p>Date: {state.details.date}</p>
            <p>Location: {state.details.location}</p>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ConfirmUpload;
