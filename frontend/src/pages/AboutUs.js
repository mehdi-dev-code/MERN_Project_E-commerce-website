import React from 'react';
import '../styles/about.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <h2>About Us</h2>
      
      <section className="about-content">
        <h3>Welcome to Our E-Commerce Store</h3>
        <p>
          We are a dedicated e-commerce platform committed to providing the best shopping experience
          for our customers. With a wide variety of products and excellent customer service, we strive
          to make online shopping convenient and enjoyable.
        </p>
        
        <h3>Our Mission</h3>
        <p>
          To deliver high-quality products at competitive prices while maintaining excellent customer
          service and building long-term relationships with our valued customers.
        </p>
        
        <h3>Why Choose Us?</h3>
        <ul>
          <li>Wide selection of products</li>
          <li>Competitive prices</li>
          <li>Fast and reliable shipping</li>
          <li>Excellent customer support</li>
          <li>Secure payment options</li>
          <li>Easy returns and exchanges</li>
        </ul>
        
        <h3>Contact Us</h3>
        <p>For more information, please visit our <a href="/contact">Contact Us</a> page.</p>
      </section>
    </div>
  );
};

export default AboutUs;
