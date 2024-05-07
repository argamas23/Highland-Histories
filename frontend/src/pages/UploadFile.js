// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDropzone } from 'react-dropzone';

// const UploadFile = () => {
//     const [file, setFile] = useState(null);
//     const history = useHistory();

//     const onDrop = acceptedFiles => {
//         setFile(acceptedFiles[0]);
//     };

//     const { getRootProps, getInputProps } = useDropzone({ onDrop });

//     const handleNext = () => {
//         history.push({
//             pathname: '/file-details',
//             state: { file }
//         });
//     };

//     return (
//         <div>
//             <h2>Upload File</h2>
//             <div {...getRootProps()} className="dropzone">
//                 <input {...getInputProps()} />
//                 {file ? <p>{file.name}</p> : <p>Drag & drop a file here, or click to select one</p>}
//             </div>
//             {file && <button onClick={handleNext}>Next</button>}
//         </div>
//     );
// };

// export default UploadFile;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const onDrop = acceptedFiles => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleNext = () => {
        navigate('/file-details', { state: { file } });
    };

    return (
        <div>
            <h2>Upload File</h2>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {file ? <p>{file.name}</p> : <p>Drag & drop a file here, or click to select one</p>}
            </div>
            {file && <button onClick={handleNext}>Next</button>}
        </div>
    );
};

export default UploadFile;
