import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
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
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
        <p>Developed by Mehdi Ali </p>
        {/* https://codeastro.com/category/reactjs/ */}
      </div>
    </footer>
  );
};

export default Footer;
