// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';

// // const ViewUpload = () => {
// //     const { id } = useParams();
// //     const [upload, setUpload] = useState(null);

// //     useEffect(() => {
// //         console.log('Fetching details for ID:', id); // Log ID
// //         const fetchUpload = async () => {
// //             try {
// //                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
// //                 const data = await response.json();
// //                 console.log('Fetched data:', data); // Log fetched data
// //                 if (response.ok) {
// //                     setUpload(data);
// //                 } else {
// //                     throw new Error('Failed to fetch upload details');
// //                 }
// //             } catch (error) {
// //                 console.error("Error fetching upload details:", error);
// //             }
// //         };
// //         fetchUpload();
// //     }, [id]);

    

// //     if (!upload) return <div>Loading...</div>;

// //     return (
// //         <div>
// //             <h2>{upload.title}</h2>
// //             <p>{upload.description}</p>
             
// //             {/* {upload.filename.endsWith('.pdf') && (
// //                                 <object data={upload.url} type="application/pdf" width="100%" height="600px">
// //                                     <iframe src={upload.url} width="100%" height="600px">
// //                                         <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
// //                                     </iframe>
// //                                 </object>)} */}

// //             {upload.fileType === 'application/pdf' && (
// //                             <object data={upload.url} type="application/pdf" width="100%" height="600px">
// //                                 <iframe src={upload.url} width="100%" height="600px">
// //                                     <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
// //                                 </iframe>
// //                             </object>
// //                         )}



// //             {/* {upload.fileType?.startsWith('audio/') && (
// //                 <audio controls src={upload.url}  type="audio/mpeg">
// //                      <p>Your browser does not support the audio element.</p>
// //                 </audio>
// //             )} */}

// //             {/* {upload.fileType?.startsWith('video/') && (
// //                 <video controls src={upload.url} width="100%">
// //                     <p>Your browser does not support the video element.</p>
// //                 </video>
// //             )} */}

// // {upload.fileType === 'audio/mpeg' && (
// //     <audio controls src={upload.url}>
// //         Your browser does not support the audio element.
// //     </audio>
// // )}
// // {upload.fileType === 'video/mp4' && ( 
// //     <video controls src={upload.url} width="100%">
// //         Your browser does not support the video element.
// //     </video>
// // )}

           


// //         </div>
// //     );
// // };

// // export default ViewUpload;


















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ViewUpload = () => {
//     const { id } = useParams();
//     const [upload, setUpload] = useState(null);

//     useEffect(() => {
//         console.log('Fetching details for ID:', id); // Log ID
//         const fetchUpload = async () => {
//             try {
//                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
//                 const data = await response.json();
//                 console.log('Fetched data:', data); // Log fetched data
//                 if (response.ok) {
//                     if (data.url.includes('undefined')) {
//                         data.url = `http://43.204.23.49/uploads/${data.filename}`;
//                     }
//                     setUpload(data);
//                 } else {
//                     throw new Error('Failed to fetch upload details');
//                 }
//             } catch (error) {
//                 console.error("Error fetching upload details:", error);
//             }
//         };
//         fetchUpload();
//     }, [id]);

//     if (!upload) return <div>Loading...</div>;

//     const renderContent = () => {
//         const { fileType , filename } = upload;     
//         const fileUrl = `http://43.204.23.49/uploads/${filename}`;    
//         switch (true) {
//             case filename.endsWith('.pdf'):
//                 return (
//                     // <object data={url} type="application/pdf" width="100%" height="600px">
//                     //     <iframe src={url} width="100%" height="600px">
//                     //         <p>This browser does not support PDFs. Please download the PDF to view it: <a href={url}>Download PDF</a>.</p>
//                     //     </iframe>
//                     // </object>

                   
//                                                         <object data={upload.url} type="application/pdf" width="100%" height="600px">
//                                                             <iframe src={upload.url} width="100%" height="600px">
//                                                                 <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
//                                                             </iframe>
//                                                         </object>
//                 );
//             case fileType.startsWith('audio/'):
//                 return (
//                     <audio controls src={url}>
//                         Your browser does not support the audio element.
//                     </audio>
//                 );
//             case fileType.startsWith('video/'):
//                 return (
//                     <video controls src={url} width="100%">
//                         Your browser does not support the video element.
//                     </video>
//                 );
//             default:
//                 return <p>Unsupported file type.</p>;
//         }
//     };

//     return (
//         <div>
//             <h2>{upload.title}</h2>
//             <p>{upload.description}</p>
//             {renderContent()}
//         </div>
//     );
// };

// export default ViewUpload;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewUpload = () => {
    const { id } = useParams();
    const [upload, setUpload] = useState(null);
    const [fileData, setFileData] = useState(null);

    useEffect(() => {
        const fetchUpload = async () => {
            try {
                const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setUpload(data);
                    fetchFileData(data.filename); // Fetch the file data based on the filename
                } else {
                    throw new Error('Failed to fetch upload details');
                }
            } catch (error) {
                console.error("Error fetching upload details:", error);
            }
        };

        const fetchFileData = async (filename) => {
            try {
                const response = await fetch(`http://43.204.23.49/uploads/${filename}`);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFileData(reader.result);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error("Error fetching file data:", error);
            }
        };

        fetchUpload();
    }, [id]);

    if (!upload) return <div>Loading...</div>;

    const renderContent = () => {
        const { fileType , filename } = upload;

        if (filename.endsWith('.pdf')) {
            return (
                <object data={fileData} type="application/pdf" width="100%" height="600px">
                    <iframe src={fileData} width="100%" height="600px">
                        <p>This browser does not support PDFs. Please download the PDF to view it: <a href={fileData}>Download PDF</a>.</p>
                    </iframe>
                </object>
            );
        } else if (fileType === 'audio/mpeg') {
            return (
                <audio controls src={fileData}>
                    Your browser does not support the audio element.
                </audio>
            );
        } else if (fileType === 'video/mp4') {
            return (
                <video controls src={fileData} width="100%">
                    Your browser does not support the video element.
                </video>
            );
        } else {
            return <p>Unsupported file type.</p>;
        }
    };

    return (
        <div>
            <h2>{upload.title}</h2>
            <p>{upload.description}</p>
            {renderContent()}
        </div>
    );
};

export default ViewUpload;

