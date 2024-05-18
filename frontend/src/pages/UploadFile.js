import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './dropzone.css';


const UploadFile = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onDrop = acceptedFiles => {

        console.log(acceptedFiles);
        setFile(acceptedFiles[0]);
        
    };

   
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleNext = () => {
        // console.log(file);
        if (file) {
            console.log('Navigating with:', file);
            navigate('/file-details', { state: { file } }); // Navigate with the file in state
        } else {
            alert("Please select a file first.");
        }
    // };
        // navigate('/file-details', { state: { file } });
    };

    return (
        <div className="dropzone-container">
          <h2>Upload File</h2>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {file ? <p>{file.name}</p> : <p>Drag & drop a file here, or click to select one</p>}
          </div>
          <div className="button-container">
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      );
};

export default UploadFile;
