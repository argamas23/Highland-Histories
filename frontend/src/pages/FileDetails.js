import React, { useState , useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';

// const locations = [
//     { label: 'Sikkim', value: 'Sikkim' },
//     // Add more locations as needed
// ];
const FileDetails = () => {
    // const { state } = useLocation();
    const location = useLocation();
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        title: '',
        caption: '',
        categories: [],
        description: '',
        date: '',
        location: '',
        userId: localStorage.getItem('userId'), // Fetch userId from localStorage
    });

    useEffect(() => {
        if (!location.state || !location.state.file) {
            navigate('/upload'); // Redirect back if no file is in state
        }
    }, [location, navigate]);


    // const handleChange = (key, value) => {
    //     setDetails({ ...details, [key]: value });
    // };

    const handleChange = (key, value) => {
        setDetails(prevDetails => ({ ...prevDetails, [key]: value }));
    };

    // const handleSubmit = () => {
    //     console.log(details);
    //     navigate('/confirm-upload', {
    //         state: { file: state.file, details }
    //     });
    // };

    const handleSubmit = () => {
        console.log(details);
        navigate('/confirm-upload', {
            state: { details , file: location.state.file }
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
                <input
                    type="text"
                    value={details.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                />
            </div>
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
};

export default FileDetails;

