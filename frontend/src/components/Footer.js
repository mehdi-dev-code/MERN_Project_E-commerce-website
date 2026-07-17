import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <svg className="footer-wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 30 C 150 60 350 0 600 30 C 850 60 1050 0 1200 30 L1200 0 L0 0 Z" fill="var(--paper)" />
      </svg>

      <div className="footer-container">
        <div className="footer-section footer-brand">
          <h4 className="footer-logo">Shop<span>Wave</span></h4>
          <p>We provide the best e-commerce experience for our customers.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: mehdi035559@gmail.com</p>
          <p>Phone: +92 127627983</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 ShopWave. All rights reserved.</p>
        <p>Developed by Mehdi Ali</p>
      </div>
    </footer>
  );
};

export default Footer;
