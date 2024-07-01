// import React from 'react';
// import './Home.css'; // Import CSS file

// const Home = () => {
//   return (
//     <div className="container">
//       <h1>Highland Histories</h1>
//       <h2>Digital Archives</h2>
//       <p>
//         Mountains are not merely geographically distinct, the human societies they nurtured are markedly different from those which emerged in the plains. This research theme works to centre mountain societies from the margins of social theory and historical practice. It draws on the works of Lucien Febvre, Owen Lattimore, Shekhar Pathak, Chetan Singh, Willem van Schendel, James Scott, and Aniket Alam, among other scholars of mountain societies to build conceptual tools, methodologies, and social theory for the study of mountain societies.
//       </p>
//       <p>
//         This is called a Lab because the intention is to, one, test social science and humanities theories for the specificities of mountain societies and, two, integrate computational tools like GIS, NLP, Data Analytics and Machine Learning into our research methods and theories.
//       </p>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import './Home.css'; // Import CSS file

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);
    // Update the path to the correct one
    const images = require.context('../images/home', false, /\.(png|jpe?g|svg|heic)$/);

    console.log(images.keys());
    const imagePaths = images.keys().map(image => images(image).default);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(current => (current + 1) % imagePaths.length);
        }, 10000); // Change image every 10 seconds

        return () => clearInterval(intervalId); // Cleanup to stop the interval when the component unmounts
    }, [imagePaths.length]);
    console.log(imagePaths);
    if (imagePaths.length === 0) {
        return <div>Loading images...</div>;
    }

        return (
            <div className="container">
                <h1>Highland Histories</h1>
                <h2>Digital Archives</h2>
                {imagePaths.length > 0 && <img src={imagePaths[currentImage]} alt="Mountain Archive" style={{ width: '100%', height: 'auto' }} />}
                <p>
                    Mountains are not merely geographically distinct, the human societies they nurtured are markedly different from those which emerged in the plains. This research theme works to centre mountain societies from the margins of social theory and historical practice. It draws on the works of Lucien Febvre, Owen Lattimore, Shekhar Pathak, Chetan Singh, Willem van Schendel, James Scott, and Aniket Alam, among other scholars of mountain societies to build conceptual tools, methodologies, and social theory for the study of mountain societies.
                </p>
                <p>
                    This is called a Lab because the intention is to, one, test social science and humanities theories for the specificities of mountain societies and, two, integrate computational tools like GIS, NLP, Data Analytics and Machine Learning into our research methods and theories.
                </p>
            </div>
        );
};

export default Home;
