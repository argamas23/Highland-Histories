// import React, { useState } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
// import Select from 'react-select';

// const locations = [
//     { label: 'Sikkim', value: 'Sikkim' },
//     // Add more locations as needed
// ];

// const FileDetails = () => {
//     const { state } = useLocation();
//     const history = useHistory();
//     const [details, setDetails] = useState({
//         title: '',
//         caption: '',
//         categories: [],
//         description: '',
//         date: '',
//         location: null
//     });

//     const handleChange = (key, value) => {
//         setDetails({ ...details, [key]: value });
//     };

//     const handleSubmit = () => {
        
//         history.push({
//             pathname: '/confirm-upload',
//             state: { file: state.file, details }
//         });
//     };

//     return (
//         <div>
//             <h2>File Details</h2>
//             <div>
//                 <label>Title:</label>
//                 <input
//                     type="text"
//                     value={details.title}
//                     onChange={(e) => handleChange('title', e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Caption:</label>
//                 <input
//                     type="text"
//                     value={details.caption}
//                     onChange={(e) => handleChange('caption', e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Categories:</label>
//                 <input
//                     type="text"
//                     value={details.categories}
//                     onChange={(e) => handleChange('categories', e.target.value.split(','))}
//                 />
//             </div>
//             <div>
//                 <label>Description:</label>
//                 <textarea
//                     value={details.description}
//                     onChange={(e) => handleChange('description', e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Date:</label>
//                 <input
//                     type="date"
//                     value={details.date}
//                     onChange={(e) => handleChange('date', e.target.value)}
//                 />
//             </div>
//             <div>
//                 <label>Location:</label>
//                 <Select
//                     options={locations}
//                     value={details.location}
//                     onChange={(selected) => handleChange('location', selected)}
//                 />
//             </div>
//             <button onClick={handleSubmit}>Next</button>
//         </div>
//     );
// };

// export default FileDetails;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const locations = [
    { label: 'Sikkim', value: 'Sikkim' },
    // Add more locations as needed
];

const FileDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        title: '',
        caption: '',
        categories: [],
        description: '',
        date: '',
        location: null,
        userId: 'defaultUserId',
    });

    const handleChange = (key, value) => {
        setDetails({ ...details, [key]: value });
    };

    const handleSubmit = () => {
        navigate('/confirm-upload', {
            state: { file: state.file, details }
        });
    };

    return (
        <div>
            <h2>File Details</h2>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={details.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                />
            </div>
            <div>
                <label>Caption:</label>
                <input
                    type="text"
                    value={details.caption}
                    onChange={(e) => handleChange('caption', e.target.value)}
                />
            </div>
            <div>
                <label>Categories:</label>
                <input
                    type="text"
                    value={details.categories}
                    onChange={(e) => handleChange('categories', e.target.value.split(','))}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={details.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={details.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                />
            </div>
            <div>
                <label>Location:</label>
                <Select
                    options={locations}
                    value={details.location}
                    onChange={(selected) => handleChange('location', selected)}
                />
            </div>
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
};

export default FileDetails;
