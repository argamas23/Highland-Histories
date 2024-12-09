import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmUpload.css';

const ConfirmUpload = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [eventType, setEventType] = useState(''); // Separate state for eventType
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleUpload = () => {
        setUploading(true);

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
        formData.append('section', state.details.section); // Use section from state
        formData.append('eventType', eventType); // Add eventType
        formData.append('fileType', state.file.type);
        formData.append('interviewer', JSON.stringify(state.details.interviewer));
        formData.append('interviewee', JSON.stringify(state.details.interviewee));
        formData.append('mapType', state.details.mapType);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://highlandhistories.org/api/archives/upload', true);

        xhr.timeout = 300000; // Set timeout to 5 minutes

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                let percentCompleted = Math.round((event.loaded * 100) / event.total);
                if (event.loaded === event.total) {
                    percentCompleted = 100; // Ensure it reaches 100%
                }
                setUploadProgress(percentCompleted);
            }
        };

        xhr.ontimeout = () => {
            console.error("The request for uploading file timed out.");
            alert('File upload failed due to timeout.');
            setUploading(false);
        };

        xhr.onload = () => {
            if (xhr.status === 201) {
                alert('File and thumbnail uploaded successfully');
                navigate('/my-uploads');
            } else {
                alert('Error uploading files');
            }
            setUploading(false);
        };

        xhr.onerror = () => {
            setUploading(false);
            alert('File upload failed due to network error');
            console.error('Network error');
        };

        xhr.send(formData);
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
            <p>Section: {state.details.section}</p> {/* Display section */}
            <select
                onChange={(e) => setEventType(e.target.value)}
                defaultValue=""
                className="filter-dropdown"
            >
                <option value="">Select Event</option>
                <option value="Blog">Blog</option>
                <option value="Report">Report</option>
                <option value="Article">Article</option>
                <option value="Talks">Talks</option>
                <option value="Conference">Conference/Seminar/Workshop</option>
                <option value="Summit">Summit</option>
            </select>
            <label htmlFor="thumbnail">Upload Thumbnail:</label>
            <input type="file" id="thumbnail" accept="image/*" onChange={handleThumbnailChange} />
           
            {uploadProgress > 0 && <progress value={uploadProgress} max="100">{uploadProgress}%</progress>}
            <button onClick={handleUpload} disabled={uploading || (uploadProgress > 0 && uploadProgress < 100)} className="upload-btn">
                {uploading ? `Uploading ${uploadProgress}%` : 'Upload'}
            </button>
        </div>
    );
};

export default ConfirmUpload;
