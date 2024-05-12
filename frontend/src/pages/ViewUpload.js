// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ViewUpload = () => {
//     const { id } = useParams();
//     const [upload, setUpload] = useState(null);

//     useEffect(() => {
//         const fetchUpload = async () => {
//             const response = await fetch(`http://localhost:5000/api/archives/${id}`);
//             const data = await response.json();
//             if (response.ok) {
//                 setUpload(data);
//             } else {
//                 throw new Error('Failed to fetch upload details');
//             }
//         };

//         fetchUpload();
//     }, [id]);

//     if (!upload) return <div>Loading...</div>;

//     return (
//         <div>
//             <h2>{upload.title}</h2>
//             <p>Description: {upload.description}</p>
//             {/* Render PDF or media based on fileType */}
//             {upload.fileType && upload.fileType.startsWith('application/pdf') && (
//                 <object data={upload.url} type="application/pdf" width="100%" height="600px">
//                     <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
//                 </object>
//             )}
//             {upload.fileType && upload.fileType.startsWith('audio/') && (
//                 <audio controls src={upload.url}></audio>
//             )}
//             {upload.fileType && upload.fileType.startsWith('video/') && (
//                 <video controls src={upload.url}></video>
//             )}
//         </div>
//     );
// };

// export default ViewUpload;







import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewUpload = () => {
    const { id } = useParams();
    const [upload, setUpload] = useState(null);

    useEffect(() => {
        const fetchUpload = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/archives/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setUpload(data);
                } else {
                    throw new Error('Failed to fetch upload details');
                }
            } catch (error) {
                console.error("Error fetching upload details:", error);
            }
        };
        fetchUpload();
    }, [id]);

    // const fetchUpload = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/archives/${id}`);
    //         if (!response.ok) throw new Error('Failed to fetch upload');
    //         const data = await response.json();
    //         setUpload(data);
    //     } catch (error) {
    //         console.error("Error fetching upload details:", error);
    //     }
    // };

    if (!upload) return <div>Loading...</div>;

    return (
        <div>
            <h2>{upload.title}</h2>
            <p>{upload.description}</p>
             {/* <p>Categories: {upload.categories.join(', ')}</p> 
            <p>Date: {upload.date}</p>
            <p>Location: {upload.location}</p>  */}
          
            {/* {upload.fileType && upload.fileType.startsWith('application/pdf') && (
                <object data={upload.url} type="application/pdf" width="100%" height="600px">
                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
                </object>
            )}
            {upload.fileType && upload.fileType.startsWith('audio/') && (
                <audio controls src={upload.url}></audio>
            )}
            {upload.fileType && upload.fileType.startsWith('video/') && (
                <video controls src={upload.url}></video>
            )} */}

            {/* Render the file based on its type */}
            
            {/* Conditionally render content based on fileType */}
            {/* {upload.fileType?.includes('application/pdf') && (
                <object data={upload.url} type="application/pdf" width="100%" height="600px">
                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
                </object>
            )} */}
            {upload.filename.endsWith('.pdf') && (
                                <object data={upload.url} type="application/pdf" width="100%" height="600px">
                                    <iframe src={upload.url} width="100%" height="600px">
                                        <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
                                    </iframe>
                                </object>)}
            {upload.fileType?.startsWith('audio/') && (
                <audio controls src={upload.url}></audio>
            )}
            {upload.fileType?.startsWith('video/') && (
                <video controls src={upload.url}></video>
            )}
           
        </div>
    );
};

export default ViewUpload;
