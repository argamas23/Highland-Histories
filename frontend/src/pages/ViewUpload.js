import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ViewUpload.css'; 

const ViewUpload = () => {
    const { id } = useParams();
     const [upload, setUpload] = useState(null);

     useEffect(() => {
        console.log('Fetching details for ID:', id); // Log ID
        const fetchUpload = async () => {
            try {
                const response = await fetch(`https://highlandhistories.org/api/archives/${id}`);
            const data = await response.json();
             console.log('Fetched data:', data); // Log fetched data
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

   const handleDownload = () => {
    const link = document.createElement('a');
    link.href = upload.url;
    link.setAttribute('download', true); // This sets the download attribute to a truthy value
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};



    

    if (!upload) return <div>Loading...</div>;

    return (
       <div>
            <h2>{upload.title}</h2>
         <p>{upload.description}</p>
             
           {upload.filename.endsWith('.pdf') && (
                              <object data={upload.url} type="application/pdf" width="100%" height="600px">
                               <iframe src={upload.url} width="100%" height="600px">
                                  <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
                                    </iframe>
                              </object>)} 
{/* 
           {upload.fileType === 'application/pdf' && (
                          <object data={upload.url} type="application/pdf" width="100%" height="600px">
                                <iframe src={upload.url} width="100%" height="600px">
                                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
                             </iframe>
                          </object>
                        )} */}



             {/* {upload.fileType?.startsWith('audio/') && (
              <audio controls src={upload.url}  type="audio/mpeg">
                   <p>Your browser does not support the audio element.</p>
               </audio>
)} */}

          {/* {upload.fileType?.startsWith('video/') && (
               <video controls src={upload.url} width="100%">
                  <p>Your browser does not support the video element.</p>
            </video>
            )} */}

{upload.fileType === 'audio/mpeg' && (
   <audio controls src={upload.url}>
      Your browser does not support the audio element.
     </audio>
 )}
 {upload.fileType === 'video/mp4' && ( 
    <div className="video-container">
     <video controls src={upload.url} style={{ width: '100%' }}>
      Your browser does not support the video element.
     </video>
     </div>
 )}

{upload.fileType.startsWith('image/') && (
    <img src={upload.url} alt={upload.title} style={{ width: '50%', maxHeight: '600px' }} />
)}

{upload.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
    <iframe src={`https://docs.google.com/gview?url=${upload.url}&embedded=true`} style={{width:"100%", height:"500px"}} frameborder="0"></iframe>
)}

{upload.fileType === 'audio/x-m4a' && (
    <audio controls src={upload.url}>
        Your browser does not support the audio element.
    </audio>
)}

 {/* {upload.fileType === 'video/x-matroska' && (
    <div className="video-container">
    <video controls src={upload.url} style={{ width: '100%' }}>
    
        Your browser does not support the video element.
        
    </video>
    </div>
)}  */}
{/* 
{upload.fileType === 'video/x-matroska' && (
    <div>
        <p>This browser does not support MKV video playback.</p>
        <p>Please download the file to view it: <a href={upload.url} download>Download Video</a>.</p>
    </div>
)}    */}

{upload.fileType === 'video/x-matroska' && (
   <div style={{ padding: "20px", backgroundColor: "#f4f4f4", textAlign: "center", marginTop: "20px" }}>
        <p>This browser does not support MKV video playback.</p>
        <button 
            style={{ padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            onClick={handleDownload}>
            Download Video
        </button>
    </div>
)}




         </div>
   );
};

export default ViewUpload;






// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './ViewUpload.css'; 
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css'; 
// import VideoPlayer from './VideoPlayer'; 


// const ViewUpload = () => {
//     const { id } = useParams();
//     const [upload, setUpload] = useState(null);

//      useEffect(() => {
//         console.log('Fetching details for ID:', id); // Log ID
//         const fetchUpload = async () => {
//             try {
//                 const response = await fetch(`https://highlandhistories.org/api/archives/${id}`);
//                 const data = await response.json();
//                 console.log('Fetched data:', data); // Log fetched data
//                     if (response.ok) {
//                     setUpload(data);
//                     } else {
//                     throw new Error('Failed to fetch upload details');
//                 }
//             } catch (error) {
//                 console.error("Error fetching upload details:", error);
//                 }
//         };
//             fetchUpload();
//     }, [id]);

    

//     if (!upload) return <div>Loading...</div>;

//     return (
//        <div>
//             <h2>{upload.title}</h2>
//          <p>{upload.description}</p>
             
//            {upload.filename.endsWith('.pdf') && (
//                               <object data={upload.url} type="application/pdf" width="100%" height="600px">
//                                <iframe src={upload.url} width="100%" height="600px">
//                                   <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
//                                     </iframe>
//                               </object>)} 
// {/* 
//            {upload.fileType === 'application/pdf' && (
//                           <object data={upload.url} type="application/pdf" width="100%" height="600px">
//                                 <iframe src={upload.url} width="100%" height="600px">
//                                     <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
//                              </iframe>
//                           </object>
//                         )} */}



//              {/* {upload.fileType?.startsWith('audio/') && (
//               <audio controls src={upload.url}  type="audio/mpeg">
//                    <p>Your browser does not support the audio element.</p>
//                </audio>
// )} */}

//           {/* {upload.fileType?.startsWith('video/') && (
//                <video controls src={upload.url} width="100%">
//                   <p>Your browser does not support the video element.</p>
//             </video>
//             )} */}

// {upload.fileType === 'audio/mpeg' && (
//    <audio controls src={upload.url}>
//       Your browser does not support the audio element.
//      </audio>
//  )}
//  {upload.fileType === 'video/mp4' && ( 
//     <div className="video-container">
//      <video controls src={upload.url} style={{ width: '100%' }}>
//       Your browser does not support the video element.
//      </video>
//      </div>
//  )}

// {upload.fileType.startsWith('image/') && (
//     <img src={upload.url} alt={upload.title} style={{ width: '50%', maxHeight: '300px' }} />
// )}

// {upload.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
//     <iframe src={`https://docs.google.com/gview?url=${upload.url}&embedded=true`} style={{width:"100%", height:"500px"}} frameborder="0"></iframe>
// )}

// {upload.fileType === 'audio/x-m4a' && (
//     <audio controls src={upload.url}>
//         Your browser does not support the audio element.
//     </audio>
// )}

//  {/* {upload.fileType === 'video/x-matroska' && (
//     <div className="video-container">
//     <video controls src={upload.url} style={{ width: '100%' }}>
    
//         Your browser does not support the video element.
        
//     </video>
//     </div>
// )}  */}

// {upload.fileType === 'video/x-matroska' && (
//     <VideoPlayer url={upload.url} type="video/x-matroska" />
// )}   


//          </div>
//    );
// };

// export default ViewUpload;
