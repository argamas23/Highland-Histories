import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom v6
import './Events.css';

const Events = () => {
    const [archives, setArchives] = useState([]);
    const [filterType, setFilterType] = useState('All');
    const [selectedArchive, setSelectedArchive] = useState(null);
    const navigate = useNavigate(); // For navigation

    // Check if the token is present in localStorage for authentication
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const response = await fetch(`https://highlandhistories.org/api/archives?section=${filterType}`);
                const data = await response.json();
                if (response.ok) {
                    // Sort the archives by date of submission
                    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setArchives(data);
                } else {
                    console.error("Error fetching archives:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching archives:", error);
            }
        };

        fetchArchives();
    }, [filterType]);

    const handleArchiveClick = (archive) => {
        // If no token is found, redirect to the login page
        if (!token) {
            navigate('/login');
        } else {
            // If token is present, set the selected archive to view the details
            navigate(`/view-upload/${archive._id}`); 
        }
    };

    const renderEventType = (eventType) => {
        const eventTypeArchives = archives.filter(archive => archive.eventType === eventType);
        if (eventTypeArchives.length > 0) {
            const latestArchive = eventTypeArchives[0];
            return (
                <div
                    key={latestArchive._id}
                    className="archive-item"
                    onClick={() => handleArchiveClick(latestArchive)}
                >
                    <h3>{latestArchive.title}</h3>
                    <p><b>Description: </b>{latestArchive.description}</p>
                    <p><b>Categories: </b>{latestArchive.categories.join(', ')}</p>
                    <p><b>Date of Submission: </b>{new Date(latestArchive.createdAt).toLocaleDateString()}</p>
                </div>
            );
        }
        return null;
    };

    const renderArchives = () => {
        const eventTypes = ["Conference", "Seminar", "Workshop", "Summit"];
        return eventTypes.map(eventType => (
            <div key={eventType}>
                {archives.some(archive => archive.eventType === eventType) && (
                    <>
                        <h2>{eventType}</h2> {/* Render heading if contents are present */}
                        {renderEventType(eventType)}
                    </>
                )}
            </div>
        ));
    };

    return (
        <div className="events-container">
            <div className="archive-list">
                <h1>Events</h1>
                <select
                    onChange={e => setFilterType(e.target.value)}
                    value={filterType}
                    className="filter-dropdown"
                >
                    <option value="All">All Types</option>
                    <option value="Maps">Maps</option>
                    <option value="Documents">Documents</option>
                    <option value="Audio">Audio</option>
                    <option value="Video">Video</option>
                </select>
                {renderArchives()}
            </div>
            <div className="archive-details">
                {selectedArchive ? (
                    <div>
                        <h2>{selectedArchive.title}</h2>
                        <p>{selectedArchive.description}</p>
                        {selectedArchive.filename.endsWith('.pdf') && (
                            <object data={selectedArchive.url} type="application/pdf" width="100%" height="600px">
                                <iframe src={selectedArchive.url} width="100%" height="600px">
                                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={selectedArchive.url}>Download PDF</a>.</p>
                                </iframe>
                            </object>
                        )}
                        {selectedArchive.fileType === 'audio/mpeg' && (
                            <audio controls src={selectedArchive.url}>
                                Your browser does not support the audio element.
                            </audio>
                        )}
                        {selectedArchive.fileType === 'video/mp4' && (
                            <video controls src={selectedArchive.url} width="100%">
                                Your browser does not support the video element.
                            </video>
                        )}
                    </div>
                ) : (
                    <p>Select an archive to view its details.</p>
                )}
            </div>
        </div>
    );
};

export default Events;
