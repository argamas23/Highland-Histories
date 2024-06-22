// src/components/Footer.js

import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <section className="footer-section">
        <h4>About Us</h4>
        <p>
          We are a digital archive dedicated<br/> to preserving history.
        </p>
    </section>

        <section className="footer-section">
          <h4>Contact</h4>
          <p>Email: highlandhistories@gmail.com</p>
        </section>
        <section className="footer-section">
          <h4>Follow Us On:</h4>
          <p> Facebook- https://www.facebook.com/groups/866531951968215 </p>
          <p> Instagram- https://www.instagram.com/highlandhistories </p>
          <p> X- https://x.com/MountainMatters/status/1803831902731706763?t=bi7kQJHIUSt8kcWLoZ4oMg&s=08 </p>
        </section>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Highland Histories. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
