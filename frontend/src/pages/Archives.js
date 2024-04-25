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

// // const ArchiveItem = ({ archive, requestAccess }) => {
// //   const [requested, setRequested] = useState(false);

// // //   const handleRequestAccess = () => {
// // //     requestAccess(archive);
// // //     setRequested(true);
// // //   };

// // const handleRequestAccess = () => {
// //     if (archive.access === 'Private') {
// //       alert(`This archive is private. Please request access.`);
// //     } else {
// //       requestAccess(archive);
// //       setRequested(true);
// //     }
// //   };

// const ArchiveItem = ({ archive, requestAccess, isAuthenticated, canEdit }) => {
//     const [requested, setRequested] = useState(false);
  
//     const handleRequestAccess = () => {
//       if (archive.access === 'Private') {
//         alert(`This archive is private. Please request access.`);
//       } else {
//         requestAccess(archive);
//         setRequested(true);
//       }
//     };

//     const handleEdit = () => {
//         // Placeholder function for edit action
//         alert(`Edit functionality not implemented yet.`);
//       };
    
//       const handleUpload = (event) => {
//         // Placeholder function for upload action
//         alert(`File upload functionality not implemented yet.`);
//       };

// //   return (
// //     <li key={archive.id}>
// //       {archive.title} ({archive.access})
// //       <div>
// //         {archive.tags.map(tag => <span key={tag}>{tag}</span>)}
// //         {archive.access === 'Private' && !requested && (
// //           <button onClick={handleRequestAccess}>Request Access</button>
// //         )}
// //         {requested && <span>Request sent</span>}
// //         {archive.access === 'Public' && <button>Edit</button>}
// //         {/* Conditionally show upload button if user is authorized */}
// //         <button>Upload</button>
// //       </div>
// //     </li>
// //   );
// // };

// // return (
// //     <li key={archive.id}>
// //       {archive.title}
// //       <div>
// //         {archive.tags.map((tag, index) => (
// //           <span key={index} style={{ marginRight: '5px' }}>#{tag}</span>
// //         ))}
// //       </div>
// //       <div>
// //         <button onClick={handleRequestAccess}>{archive.access === 'Private' ? 'Request Access' : 'View'}</button>
// //         {requested && <span>Request sent</span>}
// //         {/* You will need to implement logic to only show Edit and Upload buttons to authorized users */}
// //       </div>
// //     </li>
// //   );
// // };

// return (
//     <li key={archive.id} style={{ listStyleType: 'none' }}>
//       {archive.title}
//       <div>
//         {archive.tags.map((tag, index) => (
//           <span key={index} style={{ marginRight: '5px' }}>#{tag}</span>
//         ))}
//       </div>
//       <div>
//         {isAuthenticated && archive.access === 'Private' && !requested && (
//           <button onClick={handleRequestAccess}>Request Access</button>
//         )}
//         {isAuthenticated && canEdit && (
//           <>
//             <button onClick={handleEdit}>Edit</button>
//             <input type="file" onChange={handleUpload} />
//           </>
//         )}
//         {requested && <span>Request sent</span>}
//       </div>
//     </li>
//   );
// };

// const Archives = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('All');

//   const requestAccess = (archive) => {
//     alert(`Requesting access for: ${archive.title}`);
//     // Here we would actually send the email to the owner
//   };

//   // Filter function
//   const filterArchives = (section) => {
//     return archivesData[section].filter((archive) => {
//       const titleMatch = archive.title.toLowerCase().includes(searchTerm.toLowerCase());
//       const tagMatch = archive.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
//       return titleMatch || tagMatch;
//     });
//   };

//   // Render sections with filtered archives
//   const renderArchiveSections = () => {
//     return Object.keys(archivesData).map(section => {
//       const filteredArchives = filterArchives(section);
//       if (filterType !== 'All' && filterType !== section) {
//         return null; // If a filter type is selected and it doesn't match the section, don't render it
//       }
//       return (
//         <div key={section}>
//           <h2>{section}</h2>
//           <ul>
//             {filteredArchives.length > 0 ? filteredArchives.map((archive) => (
//               <ArchiveItem key={archive.id} archive={archive} requestAccess={requestAccess} />
//             )) : <li>No {section.toLowerCase()} found.</li>}
//           </ul>
//         </div>
//       );
//     });
//   };

//   return (
//     <div>
//       <h1>Archives</h1>
//       <input
//         type="text"
//         placeholder="Search archives..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
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


import React, { useState } from 'react';
import './Archives.css'; 

// data structured by sections
const archivesData = {
  Maps: [
    { id: 1, title: 'Historical Map', access: 'Public', tags: ['geography', 'history'] },
    // ... other maps
  ],
  Documents: [
    { id: 2, title: 'Ancient Manuscript', access: 'Private', tags: ['manuscript', 'literature'] },
    // ... other documents
  ],
  Audio: [
    { id: 3, title: 'Audio Recording', access: 'Public', tags: ['oral history', 'british india'] },
    // ... other audio records
  ],
  Video: [
    { id: 3, title: 'Video Recording', access: 'Public', tags: ['oral history', 'colonial india'] },
    // ... other video records
  ],

  // Add other sections as needed
};


const ArchiveItem = ({ archive, isAuthenticated, canEdit }) => {
    


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5000/api/archives/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result); // Check the console for the response details
        alert(`File upload successful: ${result.fileDetails.filename}`);
    } catch (error) {
        console.error('Failed to fetch:', error);
        alert('File upload failed: ' + error.message);
    }
};

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file); // 'file' is the key your backend is expecting

//     try {
//         const response = await fetch('http://localhost:5000/api/archives/upload', {
//             method: 'POST',
//             body: formData,
//             // Do not set 'Content-Type' header when using FormData with fetch
//             // Fetch will automatically set the correct 'Content-Type: multipart/form-data' header
//         });

//         const result = await response.json();
//         if (response.ok) {
//             alert(`File upload successful: ${result.fileDetails.filename}`);
//         } else {
//             throw new Error(result.message || "Failed to upload file");
//         }
//     } catch (error) {
//         alert('File upload failed: ' + error.message);
//         console.error('Upload error', error);
//     }
// };

//   // const handleFileUpload = async (event) => {
//   //   const file = event.target.files[0];
//   //   if (!file) return;

//   //   // Create a FormData instance to send the file
//   //   const formData = new FormData();
//   //   formData.append('file', file);

//   //   try {
//   //     // Assuming your backend endpoint for file upload is '/api/archives/upload'
//   //     const response = await fetch('http://localhost:5000/api/archives/upload', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });

//   //     const result = await response.json();
//   //     alert(`File upload successful: ${result.filename}`);
//   //   } catch (error) {
//   //     alert('File upload failed');
//   //     console.error('Upload error', error);
//   //   }
//   // };



return (
    <li key={archive.id} style={{ listStyleType: 'none' }}>
      {archive.title}
      <div>
        {archive.tags.map((tag, index) => (
          <span key={index} style={{ marginRight: '5px' }}>#{tag}</span>
        ))}
      </div>
      <div>
        {/* {isAuthenticated && archive.access === 'Private' && !requested && (
          <button onClick={handleRequestAccess}>Request Access</button>
        )} */}
        
            <button>Edit</button>
          <input type="file" onChange={handleFileUpload} />
          
       
        
      </div>
    </li>
  );
};

const Archives = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [filterType, setFilterType] = useState('All');
  const [filterType, setFilterType] = React.useState('All');
  

  // Filter function
  // const filterArchives = (section) => {
  //   return archivesData[section].filter((archive) => {
  //     const titleMatch = archive.title.toLowerCase().includes(searchTerm.toLowerCase());
  //     const tagMatch = archive.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  //     return titleMatch || tagMatch;
  //   });
  // };

  const renderArchiveSections = () => {
    return Object.keys(archivesData).map((section) => {
      const archivesInSection = archivesData[section];
      if (filterType !== 'All' && filterType !== section) {
        return null;
      }
      return (
        <div key={section}>
          <h2>{section}</h2>
          <ul>
            {archivesInSection.length > 0 ? (
              archivesInSection.map((archive) => (
                <ArchiveItem key={archive.id} archive={archive} />
              ))
            ) : (
              <li>No {section.toLowerCase()} found.</li>
            )}
          </ul>
        </div>
      );
    });
  };

  

  // Render sections with filtered archives
  // const renderArchiveSections = () => {
  //   return Object.keys(archivesData).map(section => {
  //     const filteredArchives = filterArchives(section);
  //     if (filterType !== 'All' && filterType !== section) {
  //       return null; // If a filter type is selected and it doesn't match the section, don't render it
  //     }
  //     return (
  //       <div key={section}>
  //         <h2>{section}</h2>
  //         <ul>
  //           {filteredArchives.length > 0 ? filteredArchives.map((archive) => (
  //             <ArchiveItem key={archive.id} archive={archive} requestAccess={requestAccess} />
  //           )) : <li>No {section.toLowerCase()} found.</li>}
  //         </ul>
  //       </div>
  //     );
  //   });
  // };

  return (
    <div>
      <h1>Archives</h1>
      
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="All">All Types</option>
        <option value="Maps">Maps</option>
        <option value="Documents">Documents</option>
        <option value="Audio">Audio</option>
        <option value="Video">Video</option>
        {/* Add more options as needed */}
      </select>
      {renderArchiveSections()}
    </div>
  );
};

export default Archives;




