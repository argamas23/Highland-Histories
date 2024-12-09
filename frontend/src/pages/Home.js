import React, { useState, useEffect } from 'react';
import './Home.css'; // Import CSS file

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const images = require.context('../images/home', false, /\.(png|jpe?g|svg|heic)$/);

    const imagePaths = images.keys().map(image => {
        const path = images(image);
        return path.default || path;
    });

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
        <div className="home-container">
            <div className="image-container">
                {imagePaths.map((path, index) => (
                    <img
                        key={index}
                        src={path}
                        alt={`Mountain Archive ${index + 1}`}
                        className={`carousel-image ${index === currentImage ? 'active' : ''}`}
                    />
                ))}
            </div>
            <div className="home-overlay">
                <h1>Highland Histories</h1>
                <h2><em>Making Mountains Matter</em></h2>

                <div className="home-content">
                    <p id="home-para">
                        Highland Histories is the home for research, thinking, knowing, and engaging with mountains and their societies. We will host primary sources – visual, oral, textual – in our archives and build a library of on-going research and other resources.
                    </p>
                    <p id="home-para">
                        At present Highland Histories is based out of Aniket Alam’s lab at IIIT Hyderabad. We hope to build a network of collaborators across the world who work on, and in, the highlands. We hope to grow this community of fellow travellers with nodes and hubs establishing partnerships and friendships across different regions, disciplines, and methods.
                    </p>
                    <p id="home-para">
                        What unites us is our perspective. Mountains have always fascinated people and continue to do so. Mountains and their worlds are seen as other-worldly geographies, realms magical, and zones of spiritual awakening. In this perspective – whether for the tourist, the researcher, or the political agent – mountains are condemned to remain the golden other of the mainstream. A liminal space, mountains open doors to alternate worlds which are the periphery of civilisation, whether ennobling or barbaric. Highlands and the people who live here thus remain perennial recipients of the altruistic or the civilising gaze, depending on preferences.
                    </p>
                    <p id="home-para">
                        Our perspective centres the Highland and its Histories. We view the mountains as a specific social formation with its own particular ways of organising lives and livelihoods, spaces and sensibilities, ecologies and economies. Conceptual tools and social theory which have emerged from the historical experience of the plains-societies cannot explain highlands and their histories, unless they are recalibrated ground up, without the hard work of rethinking them along the material realities of mountains.
                    </p>
                    <p id="home-para">
                        Highland Histories is an effort to do just that: bring people and ideas together to centre mountains and their societies through their own histories; to understand and explain mountain societies in their own terms, based on the foregrounding of the agency of highland people.
                    </p>
                    <p id="home-para">
                        Mountains are not merely geographically distinct, the human societies they nurtured are markedly different from those which emerged in the plains. Highland Histories works to centre mountain societies from the margins of social theory and historical practice. It draws on the works of Lucien Febvre, Owen Lattimore, Shekhar Pathak, Chetan Singh, Willem van Schendel, James Scott, and Aniket Alam, among other scholars of mountain societies to build conceptual tools, methodologies, and social theory for the study of mountain societies.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
