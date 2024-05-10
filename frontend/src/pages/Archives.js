// import React, { useState } from 'react';
// import './Archives.css'; 

// // data structured by sections
// const archivesData = {
//   Maps: [
//     { id: 1, title: 'Historical Map', access: 'Public', tags: ['geography', 'history'] },
//     // ... other maps
//   ],
//   Documents: [
//     { id: 2, title: 'Ancient Manuscript', access: 'Private', tags: ['manuscript', 'literature'] },
//     // ... other documents
//   ],
//   Audio: [
//     { id: 3, title: 'Audio Recording', access: 'Public', tags: ['oral history', 'british india'] },
//     // ... other audio records
//   ],
//   Video: [
//     { id: 3, title: 'Video Recording', access: 'Public', tags: ['oral history', 'colonial india'] },
//     // ... other video records
//   ],

//   // Add other sections as needed
// };


// const ArchiveItem = ({ archive, isAuthenticated, canEdit }) => {
    


//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//         const response = await fetch('http://localhost:5000/api/archives/upload', {
//             method: 'POST',
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         console.log(result); // Check the console for the response details
//         alert(`File upload successful: ${result.fileDetails.filename}`);
//     } catch (error) {
//         console.error('Failed to fetch:', error);
//         alert('File upload failed: ' + error.message);
//     }
// };

// const handleFileChange = async (event) => {
//   const newFile = event.target.files[0];
//   if (newFile) {
//     await handleEditFile(archive.id, newFile);
//   }
// };

// const handleEditFile = async (fileId, newFile) => {
//   const formData = new FormData();
//   formData.append('file', newFile);

//   try {
//       const response = await fetch(`http://localhost:5000/api/archives/${fileId}`, {
//           method: 'PUT',
//           body: formData,
//       });

//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       // console.log(result);
//       console.log("Edit result:", result);
//       alert(`File updated successfully: ${result.fileDoc.filename}`);
//   } catch (error) {
//       console.error('Failed to update file:', error);
//       alert(`File update failed: ${error.message}`);
//   }
// };

// const handleDeleteFile = async (fileId) => {
//   try {
//       const response = await fetch(`http://localhost:5000/api/archives/${fileId}`, {
//           method: 'DELETE',
//       });

//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log(result);
//       alert(`File deleted successfully`);
//   } catch (error) {
//       console.error('Failed to delete file:', error);
//       alert(`File delete failed: ${error.message}`);
//   }
// };




// return (
//     <li key={archive.id} style={{ listStyleType: 'none' }}>
//       {archive.title}
//       <div>
//         {archive.tags.map((tag, index) => (
//           <span key={index} style={{ marginRight: '5px' }}>#{tag}</span>
//         ))}
//       </div>
//       <div>
//         {/* {isAuthenticated && archive.access === 'Private' && !requested && (
//           <button onClick={handleRequestAccess}>Request Access</button>
//         )} */}
        
//             {/* <button>Edit</button> */}
//           <input type="file" onChange={handleFileUpload} />
//           <button onClick={() => handleDeleteFile(archive.id)}>Delete</button>

//         <label>
//           Edit File:
//           <input type="file" onChange={handleFileChange} />
//         </label>
       
        
//       </div>
//     </li>
//   );
// };

// const Archives = () => {
 
//   const [filterType, setFilterType] = React.useState('All');
  
  

 
//   const renderArchiveSections = () => {
//     return Object.keys(archivesData).map((section) => {
//       const archivesInSection = archivesData[section];
//       if (filterType !== 'All' && filterType !== section) {
//         return null;
//       }
//       return (
//         <div key={section}>
//           <h2>{section}</h2>
//           <ul>
//             {archivesInSection.length > 0 ? (
//               archivesInSection.map((archive) => (
//                 <ArchiveItem key={archive.id} archive={archive} />
//               ))
//             ) : (
//               <li>No {section.toLowerCase()} found.</li>
//             )}
//           </ul>
//         </div>
//       );
//     });
//   };

  

 
//   return (
//     <div>
//       <h1>Archives</h1>
      
//       <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//         <option value="All">All Types</option>
//         <option value="Maps">Maps</option>
//         <option value="Documents">Documents</option>
//         <option value="Audio">Audio</option>
//         <option value="Video">Video</option>
//         {/* Add more options as needed */}
//       </select>
//       {renderArchiveSections()}
//     </div>
//   );
// };

// export default Archives;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Archives.css';

const Archives = () => {
    const [archives, setArchives] = useState([]);
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/archives');
                const data = await response.json();
                setArchives(data);
            } catch (error) {
                console.error("Error fetching archives:", error);
            }
        };

        fetchArchives();
    }, []);

    const renderArchives = () => {
        return archives.filter(archive => filterType === 'All' || archive.type === filterType)
                       .map((archive) => (
                           <li key={archive.id}>
                            <Link to={`/archives/${archive.id}`}></Link>
                               <h3>{archive.title}</h3>
                               <p>Description: {archive.description}</p>
                                <p>Tags: {archive.categories.join(', ')}</p>
                               {/* <p>Tags: {archive.tags.join(', ')}</p> */}
                           </li>
                       ));
    };

    return (
        <div>
            <h1>Archives</h1>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All">All Types</option>
                <option value="Maps">Maps</option>
                <option value="Documents">Documents</option>
                <option value="Audio">Audio</option>
                <option value="Video">Video</option>
            </select>
            <ul>
                {renderArchives()}
            </ul>
        </div>
    );
};

export default Archives;
