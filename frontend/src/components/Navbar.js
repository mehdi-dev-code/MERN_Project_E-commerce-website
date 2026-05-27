import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
    }
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">E-Commerce</Link>
        
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          
          {isLoggedIn ? (
            <>
              <li><Link to="/cart">Cart ({cartCount})</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/customer-login">Customer Login</Link></li>
              <li><Link to="/customer-signup">Customer Signup</Link></li>
              <li><Link to="/admin-login">Admin Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;