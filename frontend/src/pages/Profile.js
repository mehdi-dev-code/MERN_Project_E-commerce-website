import React, { useState, useEffect } from 'react';
import { customerAPI } from '../services/authService';
import '../styles/profile.css';

const Profile = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await customerAPI.getProfile();
      setCustomer(response.data.customer);
      setFormData(response.data.customer);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await customerAPI.updateProfile(formData);
      setCustomer(response.data.customer);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  if (!customer) return <p>Unable to load profile</p>;

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="profile-container">
        {editing ? (
          <form className="profile-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.user?.firstName || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.user?.lastName || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="button-group">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>Name:</strong> {customer.user?.firstName} {customer.user?.lastName}</p>
            <p><strong>Email:</strong> {customer.user?.email}</p>
            <p><strong>Address:</strong> {customer.address}</p>
            <p><strong>Mobile:</strong> {customer.mobile}</p>
            
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
