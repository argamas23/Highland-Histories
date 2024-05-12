// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Archives = () => {
//     const [archives, setArchives] = useState([]);
//     const [filterType, setFilterType] = useState('All');

//     useEffect(() => {
//         const fetchArchives = async () => {
//             const response = await fetch(`http://localhost:5000/api/archives?section=${filterType}`);
//             const data = await response.json();
//             if (response.ok) {
//                 setArchives(data);
//             } else {
//                 console.error("Error fetching archives:", response.statusText);
//             }
//         };

//         fetchArchives();
//     }, [filterType]);

//     return (
//         <div>
//             <h1>Archives</h1>
//             <select onChange={e => setFilterType(e.target.value)} value={filterType}>
//                 <option value="All">All Types</option>
//                 <option value="Maps">Maps</option>
//                 <option value="Documents">Documents</option>
//                 <option value="Audio">Audio</option>
//                 <option value="Video">Video</option>
//             </select>
//             {archives.map((archive) => (
//                 <div key={archive._id}>
//                     <Link to={`/view-upload/${archive._id}`}>
//                         <h3>{archive.title}</h3>
//                         <p>{archive.description}</p>
//                         <p>Categories: {archive.categories.join(', ')}</p>
//                     </Link>
//                 </div>
//             ))}
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

//     return (
//         <div>
//             <h1>Archives</h1>
//             <select onChange={e => setFilterType(e.target.value)} value={filterType}>
//                 <option value="All">All Types</option>
//                 <option value="Maps">Maps</option>
//                 <option value="Documents">Documents</option>
//                 <option value="Audio">Audio</option>
//                 <option value="Video">Video</option>
//             </select>
//             {archives.map((archive) => (
//                 <div key={archive._id}>
//                     <Link to={`/view-upload/${archive._id}`}>
//                         <h3>{archive.title}</h3>
//                         <p>{archive.description}</p>
//                         <p>Categories: {archive.categories.join(', ')}</p>
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Archives;

// const renderArchives = (section) => {
//     if (filterType === 'All') {
//         const sections = ['Maps', 'Documents', 'Audio', 'Video'];
//         return sections.map((section) => (
//             <div key={section}>
//                 <h2>{section}</h2>
//                 {archives.filter(archive => archive.section === section).map(archive => (
//                     <div key={archive._id}>
//                         <Link to={`/view-upload/${archive._id}`}>
//                             <h3>{archive.title}</h3>
//                             <p>{archive.description}</p>
//                             <p>Categories: {archive.categories.join(', ')}</p>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         ));
//     } else {
//         return archives.map((archive) => (
//             <div key={archive._id}>
//                 <Link to={`/view-upload/${archive._id}`}>
//                     <h3>{archive.title}</h3>
//                     <p>{archive.description}</p>
//                     <p>Categories: {archive.categories.join(', ')}</p>
//                 </Link>
//             </div>
//         ));
//     }
// };

// return (
//     <div>
//         <h1>Archives</h1>
//         <select onChange={e => setFilterType(e.target.value)} value={filterType}>
//             <option value="All">All Types</option>
//             <option value="Maps">Maps</option>
//             <option value="Documents">Documents</option>
//             <option value="Audio">Audio</option>
//             <option value="Video">Video</option>
//         </select>
//         {renderArchives()}
//     </div>
// );
// };

const renderSection = (section) => {
    return archives.filter(archive => archive.section === section).map(archive => (
        <div key={archive._id}>
            <Link to={`/view-upload/${archive._id}`}>
                <h3>{archive.title}</h3>
                
            </Link>
            <p>{archive.description}</p>
                <p>Categories: {archive.categories.join(', ')}</p>
        </div>
    ));
};

const renderArchives = () => {
    if (filterType === 'All') {
        const sections = ['Maps', 'Documents', 'Audio', 'Video'];
        return sections.map(section => (
            <div key={section}>
                <h2>{section}</h2>
                {renderSection(section)}
            </div>
        ));
    } else {
        return renderSection(filterType);
    }
};

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
        {renderArchives()}
    </div>
);
};

export default Archives;
