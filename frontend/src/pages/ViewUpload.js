// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { useParams } from 'react-router-dom';

// // // // // // const ViewUpload = () => {
// // // // // //     const { id } = useParams();
// // // // // //     const [upload, setUpload] = useState(null);

// // // // // //     useEffect(() => {
// // // // // //         console.log('Fetching details for ID:', id); // Log ID
// // // // // //         const fetchUpload = async () => {
// // // // // //             try {
// // // // // //                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
// // // // // //                 const data = await response.json();
// // // // // //                 console.log('Fetched data:', data); // Log fetched data
// // // // // //                 if (response.ok) {
// // // // // //                     setUpload(data);
// // // // // //                 } else {
// // // // // //                     throw new Error('Failed to fetch upload details');
// // // // // //                 }
// // // // // //             } catch (error) {
// // // // // //                 console.error("Error fetching upload details:", error);
// // // // // //             }
// // // // // //         };
// // // // // //         fetchUpload();
// // // // // //     }, [id]);

    

// // // // // //     if (!upload) return <div>Loading...</div>;

// // // // // //     return (
// // // // // //         <div>
// // // // // //             <h2>{upload.title}</h2>
// // // // // //             <p>{upload.description}</p>
             
// // // // // //             {/* {upload.filename.endsWith('.pdf') && (
// // // // // //                                 <object data={upload.url} type="application/pdf" width="100%" height="600px">
// // // // // //                                     <iframe src={upload.url} width="100%" height="600px">
// // // // // //                                         <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
// // // // // //                                     </iframe>
// // // // // //                                 </object>)} */}

// // // // // //             {upload.fileType === 'application/pdf' && (
// // // // // //                             <object data={upload.url} type="application/pdf" width="100%" height="600px">
// // // // // //                                 <iframe src={upload.url} width="100%" height="600px">
// // // // // //                                     <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
// // // // // //                                 </iframe>
// // // // // //                             </object>
// // // // // //                         )}



// // // // // //             {/* {upload.fileType?.startsWith('audio/') && (
// // // // // //                 <audio controls src={upload.url}  type="audio/mpeg">
// // // // // //                      <p>Your browser does not support the audio element.</p>
// // // // // //                 </audio>
// // // // // //             )} */}

// // // // // //             {/* {upload.fileType?.startsWith('video/') && (
// // // // // //                 <video controls src={upload.url} width="100%">
// // // // // //                     <p>Your browser does not support the video element.</p>
// // // // // //                 </video>
// // // // // //             )} */}

// // // // // // {upload.fileType === 'audio/mpeg' && (
// // // // // //     <audio controls src={upload.url}>
// // // // // //         Your browser does not support the audio element.
// // // // // //     </audio>
// // // // // // )}
// // // // // // {upload.fileType === 'video/mp4' && ( 
// // // // // //     <video controls src={upload.url} width="100%">
// // // // // //         Your browser does not support the video element.
// // // // // //     </video>
// // // // // // )}

           


// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default ViewUpload;


















// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useParams } from 'react-router-dom';

// // // // // const ViewUpload = () => {
// // // // //     const { id } = useParams();
// // // // //     const [upload, setUpload] = useState(null);

// // // // //     useEffect(() => {
// // // // //         console.log('Fetching details for ID:', id); // Log ID
// // // // //         const fetchUpload = async () => {
// // // // //             try {
// // // // //                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
// // // // //                 const data = await response.json();
// // // // //                 console.log('Fetched data:', data); // Log fetched data
// // // // //                 if (response.ok) {
// // // // //                     if (data.url.includes('undefined')) {
// // // // //                         data.url = `http://43.204.23.49/uploads/${data.filename}`;
// // // // //                     }
// // // // //                     setUpload(data);
// // // // //                 } else {
// // // // //                     throw new Error('Failed to fetch upload details');
// // // // //                 }
// // // // //             } catch (error) {
// // // // //                 console.error("Error fetching upload details:", error);
// // // // //             }
// // // // //         };
// // // // //         fetchUpload();
// // // // //     }, [id]);

// // // // //     if (!upload) return <div>Loading...</div>;

// // // // //     const renderContent = () => {
// // // // //         const { fileType , filename } = upload;     
// // // // //         const fileUrl = `http://43.204.23.49/uploads/${filename}`;    
// // // // //         switch (true) {
// // // // //             case filename.endsWith('.pdf'):
// // // // //                 return (
// // // // //                     // <object data={url} type="application/pdf" width="100%" height="600px">
// // // // //                     //     <iframe src={url} width="100%" height="600px">
// // // // //                     //         <p>This browser does not support PDFs. Please download the PDF to view it: <a href={url}>Download PDF</a>.</p>
// // // // //                     //     </iframe>
// // // // //                     // </object>

                   
// // // // //                                                         <object data={upload.url} type="application/pdf" width="100%" height="600px">
// // // // //                                                             <iframe src={upload.url} width="100%" height="600px">
// // // // //                                                                 <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
// // // // //                                                             </iframe>
// // // // //                                                         </object>
// // // // //                 );
// // // // //             case fileType.startsWith('audio/'):
// // // // //                 return (
// // // // //                     <audio controls src={url}>
// // // // //                         Your browser does not support the audio element.
// // // // //                     </audio>
// // // // //                 );
// // // // //             case fileType.startsWith('video/'):
// // // // //                 return (
// // // // //                     <video controls src={url} width="100%">
// // // // //                         Your browser does not support the video element.
// // // // //                     </video>
// // // // //                 );
// // // // //             default:
// // // // //                 return <p>Unsupported file type.</p>;
// // // // //         }
// // // // //     };

// // // // //     return (
// // // // //         <div>
// // // // //             <h2>{upload.title}</h2>
// // // // //             <p>{upload.description}</p>
// // // // //             {renderContent()}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default ViewUpload;



// // // // import React, { useEffect, useState } from 'react';
// // // // import { useParams } from 'react-router-dom';

// // // // const ViewUpload = () => {
// // // //     const { id } = useParams();
// // // //     const [upload, setUpload] = useState(null);
// // // //     const [fileData, setFileData] = useState(null);

// // // //     useEffect(() => {
// // // //         const fetchUpload = async () => {
// // // //             try {
// // // //                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
// // // //                 // const data = await response.json();
// // // //                 if (response.ok) {
// // // //                     const data = await response.json();
// // // //                     setUpload(data);
// // // //                     fetchFileData(data.filename); // Fetch the file data based on the filename
// // // //                 } else {
// // // //                     throw new Error('Failed to fetch upload details');
// // // //                 }
// // // //             } catch (error) {
// // // //                 console.error("Error fetching upload details:", error);
// // // //             }
// // // //         };

// // // //         const fetchFileData = async (filename) => {
// // // //             try {
// // // //                 const response = await fetch(`http://43.204.23.49/uploads/${filename}`);
// // // //                 const blob = await response.blob();
// // // //                 const url = URL.createObjectURL(blob);
// // // //                 setFileData(url);
// // // //                 // const reader = new FileReader();
// // // //                 // reader.onloadend = () => {
// // // //                 //     setFileData(reader.result);
// // // //                 // };
// // // //                 // reader.readAsDataURL(blob);
// // // //             } catch (error) {
// // // //                 console.error("Error fetching file data:", error);
// // // //             }
// // // //         };

// // // //         fetchUpload();
// // // //     }, [id]);

// // // //     if (!upload) return <div>Loading...</div>;

// // // //     const renderContent = () => {
// // // //         const { fileType , filename } = upload;

// // // //         if (filename.endsWith('.pdf')) {
// // // //             return (
// // // //                 <object data={fileData} type="application/pdf" width="100%" height="600px">
// // // //                     <iframe src={fileData} width="100%" height="600px">
// // // //                         <p>This browser does not support PDFs. Please download the PDF to view it: <a href={fileData}>Download PDF</a>.</p>
// // // //                     </iframe>
// // // //                 </object>
// // // //             );
// // // //         } else if (fileType === 'audio/mpeg') {
// // // //             return (
// // // //                 <audio controls src={fileData}>
// // // //                     Your browser does not support the audio element.
// // // //                 </audio>
// // // //             );
// // // //         } else if (fileType === 'video/mp4') {
// // // //             return (
// // // //                 <video controls src={fileData} width="100%">
// // // //                     Your browser does not support the video element.
// // // //                 </video>
// // // //             );
// // // //         } else {
// // // //             return <p>Unsupported file type.</p>;
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div>
// // // //             <h2>{upload.title}</h2>
// // // //             <p>{upload.description}</p>
// // // //             {renderContent()}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default ViewUpload;
















// // // // import React, { useEffect, useState } from 'react';
// // // // import { useParams } from 'react-router-dom';

// // // // const ViewUpload = () => {
// // // //     const { id } = useParams();
// // // //     const [upload, setUpload] = useState(null);
// // // //     const [fileData, setFileData] = useState(null);
// // // //     const [error, setError] = useState('');

// // // //     useEffect(() => {
// // // //         const fetchUpload = async () => {
// // // //             try {
// // // //                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
// // // //                 if (response.ok) {
// // // //                     const data = await response.json();
// // // //                     console.log('Upload data:', data); // Log fetched data
// // // //                     setUpload(data);
// // // //                     // fetchFileData(data.filename); // Fetch the file data based on the filename
// // // //                     if (data.filename) {
// // // //                         fetchFileData(data.filename);
// // // //                     } else {
// // // //                         throw new Error('Filename is undefined or not present in the data');
// // // //                     }
// // // //                 } else {
// // // //                     throw new Error('Failed to fetch upload details');
// // // //                 }
// // // //             } catch (error) {
// // // //                 console.error("Error fetching upload details:", error);
// // // //                 setError('Failed to fetch upload details');
// // // //             }
// // // //         };

// // // //         const fetchFileData = async (filename) => {
// // // //             try {
// // // //                 const response = await fetch(`http://43.204.23.49/uploads/${filename}`);
// // // //                 if (response.ok) {
// // // //                     const blob = await response.blob();
// // // //                     const fileContentType = response.headers.get('Content-Type') || 'application/octet-stream'; // Fallback as octet-stream
// // // //                     console.log('File ContentType:', fileContentType); // Debug log
// // // //                     const url = URL.createObjectURL(new Blob([blob], { type: fileContentType }));
// // // //                     setFileData(url);
// // // //                 } else {
// // // //                     throw new Error('Failed to fetch file');
// // // //                 }
// // // //             } catch (error) {
// // // //                 console.error("Error fetching file data:", error);
// // // //                 setError('Failed to fetch file data');
// // // //             }
// // // //         };

// // // //         fetchUpload();
// // // //     }, [id]);

// // // //     if (error) return <div>Error: {error}</div>;
// // // //     if (!upload) return <div>Loading...</div>;

// // // //     const renderContent = () => {
// // // //         const { fileType, filename } = upload;
// // // //         console.log('Render fileType:', fileType, 'filename:', filename); // Debug log
// // // //         if (filename && filename.endsWith('.pdf')) {
// // // //             return (
// // // //                 <object data={fileData} type="application/pdf" width="100%" height="600px">
// // // //                     <iframe src={fileData} width="100%" height="600px">
// // // //                         <p>This browser does not support PDFs. Please download the PDF to view it: <a href={fileData}>Download PDF</a>.</p>
// // // //                     </iframe>
// // // //                 </object>
// // // //             );
// // // //         } else if (fileType === 'audio/mpeg') {
// // // //             return <audio controls src={fileData}>Your browser does not support the audio element.</audio>;
// // // //         } else if (fileType === 'video/mp4') {
// // // //             return <video controls src={fileData} width="100%">Your browser does not support the video element.</video>;
// // // //         } else {
// // // //             return <p>Unsupported file type.</p>;
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div>
// // // //             <h2>{upload.title}</h2>
// // // //             <p>{upload.description}</p>
// // // //             {renderContent()}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default ViewUpload;














// // // import React, { useEffect, useState } from 'react';
// // // import { useParams } from 'react-router-dom';

// // // const ViewUpload = () => {
// // //     const { id } = useParams();
// // //     const [upload, setUpload] = useState(null);
// // //     const [fileData, setFileData] = useState(null);
// // //     const [error, setError] = useState('');

// // //     useEffect(() => {
// // //         const fetchUpload = async () => {
// // //             try {
// // //                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
// // //                 if (response.ok) {
// // //                     const data = await response.json();
// // //                     console.log('Upload data:', data); // Log fetched data
// // //                     setUpload(data);
// // //                     // fetchFileData(data.filename); // Fetch the file data based on the filename
// // //                     if (data.filename) {
// // //                         // fetchFileData(data.filename);
// // //                         const constructedUrl = `http://43.204.23.49/uploads/${data.filename}`;
// // //                         fetchFileData(constructedUrl); // Fetch the file data based on the filename

// // //                     } else {
// // //                         throw new Error('Filename is undefined or not present in the data');
// // //                     }
// // //                 } else {
// // //                     throw new Error('Failed to fetch upload details');
// // //                 }
// // //             } catch (error) {
// // //                 console.error("Error fetching upload details:", error);
// // //                 setError('Failed to fetch upload details');
// // //             }
// // //         };

// // //     //     const fetchFileData = async (fileUrl) => {
// // //     //         try {
// // //     //             // const response = await fetch(`http://43.204.23.49/uploads/${filename}`);
// // //     //             const response = await fetch(fileUrl);
// // //     //             if (response.ok) {
// // //     //                 const blob = await response.blob();
// // //     //                 let fileContentType = 'application/octet-stream'; // Default MIME type
// // //     //                 // const fileContentType = response.headers.get('Content-Type') || 'application/octet-stream'; // Fallback as octet-stream
// // //     //                 // console.log('File ContentType:', fileContentType); // Debug log

// // //     //                 // Determine the correct MIME type based on the filename extension
// // //     //                 if (fileUrl.endsWith('.pdf')) {
// // //     //                     fileContentType = 'application/pdf';
// // //     //                 } else if (fileUrl.endsWith('.mp3')) {
// // //     //                     fileContentType = 'audio/mpeg';
// // //     //                 } else if (fileUrl.endsWith('.mp4')) {
// // //     //                     fileContentType = 'video/mp4';
// // //     //                 }

// // //     //                 const url = URL.createObjectURL(new Blob([blob], { type: fileContentType }));
// // //     //                 setFileData(url);
// // //     //             } else {
// // //     //                 throw new Error('Failed to fetch file');
// // //     //             }
// // //     //         } catch (error) {
// // //     //             console.error("Error fetching file data:", error);
// // //     //             setError('Failed to fetch file data');
// // //     //         }
// // //     //     };

// // //     //     fetchUpload();
// // //     // }, [id]);

// // //     const fetchFileData = async (fileUrl) => {
// // //         try {
// // //             const response = await fetch(fileUrl);
// // //             if (response.ok) {
// // //                 const blob = await response.blob();
// // //                 console.log('Blob size:', blob.size); // Log the size of the blob to ensure it's not zero
// // //                 let fileContentType = 'application/octet-stream'; // Default MIME type
    
// // //                 if (fileUrl.endsWith('.pdf')) {
// // //                     fileContentType = 'application/pdf';
// // //                 } else if (fileUrl.endsWith('.mp3')) {
// // //                     fileContentType = 'audio/mpeg';
// // //                 } else if (fileUrl.endsWith('.mp4')) {
// // //                     fileContentType = 'video/mp4';
// // //                 }
    
// // //                 const url = URL.createObjectURL(new Blob([blob], { type: fileContentType }));
// // //                 console.log('Generated URL:', url); // Log the URL to debug
// // //                 setFileData(url);
// // //             } else {
// // //                 throw new Error('Failed to fetch file');
// // //             }
// // //         } catch (error) {
// // //             console.error("Error fetching file data:", error);
// // //             setError('Failed to fetch file data');
// // //         }
// // //     };
    
// // //     fetchUpload();
// // // }, [id]);
    

// // //     if (error) return <div>Error: {error}</div>;
// // //     if (!upload) return <div>Loading...</div>;

// // //     const renderContent = () => {
// // //         const { fileType, filename } = upload;
// // //         console.log('Render fileType:', fileType, 'filename:', filename); // Debug log

// // //         // if (filename && filename.endsWith('.pdf')) {
// // //         //     return (
// // //         //         <object data={fileData} type="application/pdf" width="100%" height="600px">
// // //         //             <iframe src={fileData} width="100%" height="600px" title="PDF Viewer">
// // //         //                 <p>This browser does not support PDFs. Please download the PDF to view it: <a href={fileData}>Download PDF</a>.</p>
// // //         //             </iframe>
// // //         //         </object>
// // //         //     );
// // //         if (filename && filename.endsWith('.pdf')) {
// // //             return (
// // //                 <object data={fileData} type="application/pdf" width="100%" height="600px" aria-label="PDF Viewer">
// // //                     <p>This browser does not support PDFs. Please download the PDF to view it: <a href={fileData}>Download PDF</a>.</p>
// // //                 </object>
// // //             );      
        
// // //         } else if (fileType === 'audio/mpeg') {
// // //             return <audio controls src={fileData}>Your browser does not support the audio element.</audio>;
// // //         } else if (fileType === 'video/mp4') {
// // //             return <video controls src={fileData} width="100%">Your browser does not support the video element.</video>;
// // //         } else {
// // //             return <p>Unsupported file type.</p>;
// // //         }
// // //     };

// // //     return (
// // //         <div>
// // //             <h2>{upload.title}</h2>
// // //             <p>{upload.description}</p>
// // //             {renderContent()}
// // //         </div>
// // //     );
// // // };

// // // export default ViewUpload;









// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';

// // const ViewUpload = () => {
// //     const { id } = useParams();
// //     const [upload, setUpload] = useState(null);
// //     const [fileData, setFileData] = useState(null);
// //     const [error, setError] = useState('');

// //     useEffect(() => {
// //         const fetchUpload = async () => {
// //             try {
// //                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
// //                 if (response.ok) {
// //                     const data = await response.json();
// //                     setUpload(data);
// //                     if (data.filename) {
// //                         const constructedUrl = `http://43.204.23.49/uploads/${data.filename}`;
// //                         fetchFileData(constructedUrl);
// //                     } else {
// //                         throw new Error('Filename is undefined or not present in the data');
// //                     }
// //                 } else {
// //                     throw new Error('Failed to fetch upload details');
// //                 }
// //             } catch (error) {
// //                 console.error("Error fetching upload details:", error);
// //                 setError('Failed to fetch upload details');
// //             }
// //         };

// //         const fetchFileData = async (fileUrl) => {
// //             try {
// //                 const response = await fetch(fileUrl);
// //                 if (response.ok) {
// //                     const blob = await response.blob();
// //                     const reader = new FileReader();
// //                     reader.onloadend = () => {
// //                         setFileData(reader.result);
// //                     };
// //                     // Depending on the file type, you might want to read it differently
// //                     if (fileUrl.endsWith('.pdf')) {
// //                         reader.readAsDataURL(blob);
// //                     } else if (fileUrl.endsWith('.mp3') || fileUrl.endsWith('.mp4')) {
// //                         reader.readAsArrayBuffer(blob);
// //                     }
// //                 } else {
// //                     throw new Error('Failed to fetch file');
// //                 }
// //             } catch (error) {
// //                 console.error("Error fetching file data:", error);
// //                 setError('Failed to fetch file data');
// //             }
// //         };

// //         fetchUpload();
// //     }, [id]);

// //     if (error) return <div>Error: {error}</div>;
// //     if (!upload) return <div>Loading...</div>;

// //     const renderContent = () => {
// //         if (!fileData) return <p>Loading file...</p>;
// //         const { fileType, filename } = upload;
// //         if (filename.endsWith('.pdf')) {
// //             return <iframe src={fileData} style={{ width: '100%', height: '600px' }} title="PDF Viewer"></iframe>;
// //         } else if (fileType === 'audio/mpeg') {
// //             return <audio controls src={fileData}>Your browser does not support the audio element.</audio>;
// //         } else if (fileType === 'video/mp4') {
// //             return <video controls src={fileData} style={{ width: '100%' }}>Your browser does not support the video element.</video>;
// //         } else {
// //             return <p>Unsupported file type.</p>;
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>{upload.title}</h2>
// //             <p>{upload.description}</p>
// //             {renderContent()}
// //         </div>
// //     );
// // };

// // export default ViewUpload;















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ViewUpload = () => {
//     const { id } = useParams();
//     const [upload, setUpload] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchUpload = async () => {
//             try {
//                 const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setUpload(data);
//                 } else {
//                     throw new Error('Failed to fetch upload details');
//                 }
//             } catch (error) {
//                 console.error("Error fetching upload details:", error);
//                 setError('Failed to fetch upload details');
//             }
//         };

//         fetchUpload();
//     }, [id]);

//     const renderContent = () => {
//         if (!upload) return <p>Loading...</p>;
//         if (!upload.filename) return <p>File not available</p>;

//         const fileUrl = `http://43.204.23.49/uploads/${upload.filename}`;
//         if (upload.filename.endsWith('.pdf')) {
//             const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
//             return <iframe src={googleViewerUrl} style={{ width: '100%', height: '600px' }} title="PDF Viewer"></iframe>;
//         } else if (upload.filename.endsWith('.mp3')) {
//             return <audio controls src={fileUrl}>Your browser does not support the audio element.</audio>;
//         } else if (upload.filename.endsWith('.mp4')) {
//             return <video controls style={{ width: '100%' }} src={fileUrl}>Your browser does not support the video element.</video>;
//         } else {
//             return <p>Unsupported file type.</p>;
//         }
//     };

//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h2>{upload ? upload.title : 'Loading...'}</h2>
//             <p>{upload ? upload.description : 'Please wait while the file data is being loaded.'}</p>
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
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUpload = async () => {
            try {
                const uploadResponse = await fetch(`http://43.204.23.49/api/archives/${id}`);
                if (uploadResponse.ok) {
                    const uploadData = await uploadResponse.json();
                    setUpload(uploadData);
                    const fileResponse = await fetch(`http://43.204.23.49/uploads/${uploadData.filename}`, { method: 'GET' });
                    if (fileResponse.ok) {
                        const blob = await fileResponse.blob();
                        const objectURL = URL.createObjectURL(blob);
                        setFileData({ url: objectURL, type: uploadData.fileType });
                    } else {
                        throw new Error('Failed to fetch file');
                    }
                } else {
                    throw new Error('Failed to fetch upload details');
                }
            } catch (error) {
                console.error("Error:", error);
                setError('Failed to load content');
            }
        };

        fetchUpload();
    }, [id]);

    const renderContent = () => {
        if (error) return <div>Error: {error}</div>;
        if (!upload || !fileData) return <div>Loading...</div>;

        switch (upload.fileType) {
            case 'application/pdf':
                // Use PDF.js here if you prefer or the iframe approach shown below
                return <iframe src={fileData.url} style={{ width: '100%', height: '600px' }} title="PDF Viewer"></iframe>;
            case 'audio/mpeg':
                return <audio controls src={fileData.url}>Your browser does not support the audio element.</audio>;
            case 'video/mp4':
                return <video controls style={{ width: '100%' }} src={fileData.url}>Your browser does not support the video element.</video>;
            default:
                return <p>Unsupported file type.</p>;
        }
    };

    return (
        <div>
            <h2>{upload ? upload.title : 'Loading...'}</h2>
            <p>{upload ? upload.description : 'Please wait while the file data is being loaded.'}</p>
            {renderContent()}
        </div>
    );
};

export default ViewUpload;

