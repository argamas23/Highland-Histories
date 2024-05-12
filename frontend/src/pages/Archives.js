// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Archives.css';

// const Archives = () => {
//     const [archives, setArchives] = useState([]);
//     const [filterType, setFilterType] = useState('All');

//     useEffect(() => {
//         const fetchArchives = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/archives');
//                 const data = await response.json();
//                 setArchives(data);
//             } catch (error) {
//                 console.error("Error fetching archives:", error);
//             }
//         };

//         fetchArchives();
//     }, []);

//     const renderArchives = () => {
//         return archives.filter(archive => filterType === 'All' || archive.type === filterType)
//                        .map((archive) => (
//                            <li key={archive.id}>
//                             <Link to={`/archives/${archive.id}`}></Link>
//                                <h3>{archive.title}</h3>
//                                <p>Description: {archive.description}</p>
//                                 <p>Tags: {archive.categories.join(', ')}</p>
//                                {/* <p>Tags: {archive.tags.join(', ')}</p> */}
//                            </li>
//                        ));
//     };

//     return (
//         <div>
//             <h1>Archives</h1>
//             <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//                 <option value="All">All Types</option>
//                 <option value="Maps">Maps</option>
//                 <option value="Documents">Documents</option>
//                 <option value="Audio">Audio</option>
//                 <option value="Video">Video</option>
//             </select>
//             <ul>
//                 {renderArchives()}
//             </ul>
//         </div>
//     );
// };

// export default Archives;








// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Archives.css';

// const Archives = () => {
//     const [archives, setArchives] = useState([]);
//     const [filterType, setFilterType] = useState('All');

//     useEffect(() => {
//         const fetchArchives = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/archives');
//                 const data = await response.json();
//                 setArchives(data);
//             } catch (error) {
//                 console.error("Error fetching archives:", error);
//             }
//         };

//         fetchArchives();
//     }, []);

//     const renderArchivesBySection = (section) => {
//         return archives
//             .filter(archive => filterType === 'All' || archive.type === filterType)
//             .filter(archive => archive.section === section)
//             .map((archive) => (
//                 <li key={archive.id}>
//                     <Link to={`/archives/${archive.id}`}>
//                         <h3>{archive.title}</h3>
//                     </Link>
//                     <p>Description: {archive.description}</p>
//                     <p>Tags: {archive.categories.join(', ')}</p>
//                 </li>
//             ));
//     };

//     return (
//         <div>
//             <h1>Archives</h1>
//             <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//                 <option value="All">All Types</option>
//                 <option value="Maps">Maps</option>
//                 <option value="Documents">Documents</option>
//                 <option value="Audio">Audio</option>
//                 <option value="Video">Video</option>
//             </select>
//             <div>
//                 <h2>Maps</h2>
//                 <ul>{renderArchivesBySection('Maps')}</ul>
//                 <h2>Documents</h2>
//                 <ul>{renderArchivesBySection('Documents')}</ul>
//                 <h2>Audio</h2>
//                 <ul>{renderArchivesBySection('Audio')}</ul>
//                 <h2>Video</h2>
//                 <ul>{renderArchivesBySection('Video')}</ul>
//             </div>
//         </div>
//     );
// };

// export default Archives;








// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Archives.css';

// const Archives = () => {
//     const [archives, setArchives] = useState([]);
//     const [filterType, setFilterType] = useState('All');

//     useEffect(() => {
        
//         const fetchArchives = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/archives');
//                 const data = await response.json();
//                 setArchives(data);
//             } catch (error) {
//                 console.error("Error fetching archives:", error);
//             }
//         };

//         fetchArchives();
//     }, []);

//     const renderArchivesBySection = (section) => {
//         return archives
//             .filter(archive => filterType === 'All' || archive.type === filterType)
//             .filter(archive => archive.section === section)
//             .map((archive) => (
//                 <li key={archive.id}>
//                     {/* <Link to={`/archives/${archive.id}`}> */}
//                     <Link to={`/archive-detail/${archive._id}`}>
//                         <h3>{archive.title}</h3>
//                     </Link>
//                     <p>Description: {archive.description}</p>
//                     <p>Tags: {archive.categories.join(', ')}</p>
//                     <p>Date: {archive.date}</p>
//                     <p>Location: {archive.location}</p>
//                 </li>
//             ));
//     };

//     return (
//         <div>
//             <h1>Archives</h1>
//             <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//                 <option value="All">All Types</option>
//                 <option value="Maps">Maps</option>
//                 <option value="Documents">Documents</option>
//                 <option value="Audio">Audio</option>
//                 <option value="Video">Video</option>
//             </select>
//             <div>
//                 <h2>Maps</h2>
//                 <ul>{renderArchivesBySection('Maps')}</ul>
//                 <h2>Documents</h2>
//                 <ul>{renderArchivesBySection('Documents')}</ul>
//                 <h2>Audio</h2>
//                 <ul>{renderArchivesBySection('Audio')}</ul>
//                 <h2>Video</h2>
//                 <ul>{renderArchivesBySection('Video')}</ul>
//             </div>
//         </div>
//     );
// };

// export default Archives;




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Archives = () => {
    const [archives, setArchives] = useState([]);
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        const fetchArchives = async () => {
            const response = await fetch(`http://localhost:5000/api/archives?section=${filterType}`);
            const data = await response.json();
            if (response.ok) {
                setArchives(data);
            } else {
                console.error("Error fetching archives:", response.statusText);
            }
        };

        fetchArchives();
    }, [filterType]);

    return (
        <div>
            <h1>Archives</h1>
            <select onChange={e => setFilterType(e.target.value)} value={filterType}>
                <option value="All">All Types</option>
                <option value="Maps">Maps</option>
                <option value="Documents">Documents</option>
                <option value="Audio">Audio</option>
                <option value="Video">Video</option>
            </select>
            {archives.map((archive) => (
                <div key={archive._id}>
                    <Link to={`/view-upload/${archive._id}`}>
                        <h3>{archive.title}</h3>
                        <p>{archive.description}</p>
                        <p>Categories: {archive.categories.join(', ')}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Archives;
