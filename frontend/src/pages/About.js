// src/pages/About.js
import React from 'react';
import './About.css'; // Import CSS file

const About = () => {
  return (
    <div className="container">
      <h1>About Us</h1>
      <p style={{ textAlign: 'left' }}>
        The main focus at present is on the Himalayas, but work is ongoing to include other highland societies in India, and eventually Asia. At present there are three projects which are operational under this research theme:
      </p>

      <ol style={{ textAlign: 'left' }}>
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

      <p style={{ textAlign: 'left' }}>
        One project has been completed in this theme. It was titled "Continuity and Change in a Trans-Himalayan Buddhist Community: A Study of Monasteries in Spiti, Himachal Pradesh". It was funded by the ICSSR, New Delhi and extended from 2018 to 2023.
      </p>

      <p style={{ textAlign: 'left' }}>
        <b>Faculty involved:</b> <a href="https://hsrc.iiit.ac.in/people/faculty/aniket.html" target="_blank" rel="noopener noreferrer">Aniket Alam</a>
      </p>
      <p style={{ textAlign: 'left' }}>
      <b>Students involved:</b> <a href="https://hsrc.iiit.ac.in/people/phd/aman.html" target="_blank" rel="noopener noreferrer">Aman Kant Panta</a>, <a href="https://hsrc.iiit.ac.in/people/phd/regina.html" target="_blank" rel="noopener noreferrer">Regina Gurung</a>, Kriti Agrawal, Ch Swamy Naidu, Hitesh Goel, Aishani Pandey, Samagra Bharti
      </p>
      <p style={{ textAlign: 'left' }}>
        <b>Research Associates:</b> Swati Condrolli, Chhering Palkit Negi
      </p>
    </div>
  );
};

export default About;
