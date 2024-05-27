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
          <h4>Follow Us</h4>
          <p>Social media links here</p>
        </section>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Highland Histories. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
