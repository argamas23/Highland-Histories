import React, { useState, useEffect } from 'react';
import './Home.css'; // Import the same CSS file

const Research = () => {
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

        return () => clearInterval(intervalId); // Cleanup when the component unmounts
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
                        alt={`Research Archive ${index + 1}`}
                        className={`carousel-image ${index === currentImage ? 'active' : ''}`}
                    />
                ))}
            </div>
            <div className="home-overlay">
                <h1>Research Themes and Projects</h1>
                <h2><em>Exploring the Himalayas and Beyond</em></h2>

                <div className="home-content">
                    <p id="home-para">
                        The main focus of research at present is on the (Indian) Himalayas, both the Western and the Eastern Himalayas. We are hoping to bring together scholars and intellectuals from other highland societies in South Asia, eventually Asia, and beyond to other continents. Our work is continuing on the following four broad themes:
                    </p>

                    <h3>Oral Histories of Himalayan Transformation</h3>
                    <p id="home-para">
                        Under this initiative, we are working to build a rich, interactive archive of oral histories of people who have lived through the second half of the 20th century, a period which saw major historical transformations. We have collected over 80 oral histories from the districts of Kullu, Shimla, Lahaul & Spiti, Sirmaur, and Kinnaur of Himachal Pradesh, and the South and West districts of Sikkim. We aim to expand to other districts of Himachal Pradesh, Sikkim, and the Garhwal districts of Uttarakhand in the coming year.
                    </p>

                    <h3>Mapping Mountains</h3>
                    <p id="home-para">
                        This research project centres mapping as a method of historical research. We are researching Himalayan pasts by focusing on maps as representations of historical conditions and processes. Our goal is to spatialize historical processes and build new insights into mountain societies. We are building software tools that use machine learning techniques to create maps from historical texts, drawing on oral histories and other historical texts in archives.
                    </p>

                    <h3>Wiki Loves Himalayas</h3>
                    <p id="home-para">
                        This initiative aims to build a network of people living and working in the Himalayas to create open knowledge archives of Highland regions. We are encouraging organic intellectuals to generate knowledge in and about their life-worlds, using platforms like Wikimedia and Wikipedia. Currently, the network has about 30 collaborators and is exploring ways to work with the Wikimedia Foundation.
                    </p>

                    <h3>State of Highland Politics</h3>
                    <p id="home-para">
                        This initiative aims to build a theory and model of the Highland State and its politics by foregrounding historical processes of State formation in the mountains. We are studying the institutions which built the State and examining the exercise of power in highland societies. This approach contrasts with the synchronic method, focusing on actual, existing States as variations of a theoretical model. We are incorporating electoral and political expressions through quantitative studies and ethnographic methods.
                    </p>

                    <p id="home-para">
                        Under these themes, we are exploring region formation in the Western Himalayas, social anomie in Sikkim, the interplay between divine and profane political institutions in Himachal Pradesh, issues of land and property, nationalism, family and kinship transformations, the political ecology of development, Polycrisis, the political economy of horticulture, new forms of community building, voting patterns, electoral democracy, and more, all in the Western and Eastern Himalayas.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Research;
