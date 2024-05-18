import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArchiveDetail = () => {
    const { id } = useParams();
    const [archive, setArchive] = useState(null);

    useEffect(() => {
        const fetchArchive = async () => {
            try {
                const response = await fetch(`http://43.204.23.49/api/archives/${id}`);
                if (!response.ok) throw new Error('Failed to fetch archive');
                const data = await response.json();
                setArchive(data);
            } catch (error) {
                console.error("Error fetching archive details:", error);
            }
        };

        fetchArchive();
    }, [id]);

    if (!archive) return <div>Loading...</div>;

    return (
        <div>
            <h2>{archive.title}</h2>
            <p>{archive.description}</p>
            <p>Tags: {archive.tags.join(', ')}</p>
            {/* Display the file or additional content here */}
        </div>
    );
};

export default ArchiveDetail;
