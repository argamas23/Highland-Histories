import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewUpload = () => {
    const { id } = useParams();
    const [upload, setUpload] = useState(null);

    useEffect(() => {
        console.log('Fetching details for ID:', id); // Log ID
        const fetchUpload = async () => {
            try {
                const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
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

    

    if (!upload) return <div>Loading...</div>;

    return (
        <div>
            <h2>{upload.title}</h2>
            <p>{upload.description}</p>
             
            {/* {upload.filename.endsWith('.pdf') && (
                                <object data={upload.url} type="application/pdf" width="100%" height="600px">
                                    <iframe src={upload.url} width="100%" height="600px">
                                        <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
                                    </iframe>
                                </object>)} */}

            {upload.fileType === 'application/pdf' && (
                            <object data={upload.url} type="application/pdf" width="100%" height="600px">
                                <iframe src={upload.url} width="100%" height="600px">
                                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={upload.url}>Download PDF</a>.</p>
                                </iframe>
                            </object>
                        )}



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
    <video controls src={upload.url} width="100%">
        Your browser does not support the video element.
    </video>
)}

           


        </div>
    );
};

export default ViewUpload;
