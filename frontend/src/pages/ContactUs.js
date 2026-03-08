import React, { useState } from 'react';
import { feedbackAPI } from '../services/authService';
import '../styles/contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    feedback: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await feedbackAPI.create(formData);
      setMessage('Thank you for your feedback!');
      setFormData({ name: '', feedback: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to send feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      
      {message && <div className="success-message">{message}</div>}
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Feedback'}
        </button>
      </form>
      
      <div className="contact-info">
        <h3>Our Contact Information</h3>
        <p><strong>Email:</strong> mehdi035559@gmail.com</p>
        <p><strong>Phone:</strong> +92 127627983</p>
        <p><strong>Address:</strong> Near University Chowk Bahwalpur</p>
      </div>
    </div>
  );
};

export default ContactUs;
