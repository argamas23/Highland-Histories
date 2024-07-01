import React, { useState, useEffect } from 'react';
import './About.css'; // Import CSS file

const About = () => {
    const [currentImage, setCurrentImage] = useState(0);
    // Update the path to the correct one
    const images = require.context('../images/about', false, /\.(png|jpe?g|svg|heic)$/);
    console.log(images.keys());
    const imagePaths = images.keys().map(image => {
        const path = images(image);
        console.log('Image:', image, 'Resolved Path:', path);
        return path.default || path;
    });

    // Log the imagePaths array to verify
    console.log(imagePaths);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(current => (current + 1) % imagePaths.length);
        }, 10000); // Change image every 10 seconds

        return () => clearInterval(intervalId); // Cleanup to stop the interval when the component unmounts
    }, [imagePaths.length]);
    if (imagePaths.length === 0) {
      return <div>Loading images...</div>;
  }
    return (
      <div className="about-container">
      <div className="image-container">
        {imagePaths.map((path, index) => (
          <img
            key={index}
            src={path}
            alt={`About Mountain Archive ${index + 1}`}
            className={`carousel-image ${index === currentImage ? 'active' : ''}`}
          />
        ))}
      </div>
      <div className="about-overlay">
        <h1 id="about-header">About Us</h1>
        <div className="about-content">
          <p id="about-para">
            The main focus at present is on the Himalayas, but work is ongoing to include other highland societies in India, and eventually Asia. At present there are three projects which are operational under this research theme:
          </p>
          <ol>
            <li>
              <b>Oral Histories of Himalayan Transformations (2021-2026):</b> This aims to build a rich, interactive archive of oral histories of the historical transformations that have happened in the Himalayan regions in the 20th century.
            </li>
            <li>
              <b>Mapping Mountains (2022-2027):</b> This project centres mapping as a method of historical research. It is researching Himalayan pasts by focussing on maps as representations of historical conditions and processes. It hopes to build new insights into mountain societies by spatialising historical processes, both in terms of geography as well as social networks. It is building software tools which will use machine learning techniques to create maps from historical texts. It will draw on the oral histories of Himalayan Transformation to build maps and conduct spatial research.
            </li>
            <li>
              <b>Wiki Loves Himalayas (2023-2025):</b> This aims to build a network of people who live and work in the Himalayas to create open knowledge archives of Himalayan regions, and encourage growth of organic intellectuals who generate knowledge in and about their own life-worlds. At present this network has about 30 participants and is working with the Wikimedia Foundation to build open knowledge resources on the Himalayas.
            </li>
          </ol>
        </div>
      </div>
    </div>
    );
};

export default About;