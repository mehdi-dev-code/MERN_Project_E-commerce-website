import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12c2.5 3 4.5 3 7 0s4.5-3 7 0 4.5 3 6 1.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
              <path d="M2 17c2.5 3 4.5 3 7 0s4.5-3 7 0 4.5 3 6 1.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.45"/>
            </svg>
          </span>
          Shop<span className="navbar-brand-accent">Wave</span>
        </Link>

        <button
          className={`navbar-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${menuOpen ? 'is-open' : ''}`}>
          <li><Link className={isActive('/') ? 'is-active' : ''} to="/">Home</Link></li>
          <li><Link className={isActive('/about') ? 'is-active' : ''} to="/about">About Us</Link></li>
          <li><Link className={isActive('/contact') ? 'is-active' : ''} to="/contact">Contact Us</Link></li>

          {isLoggedIn ? (
            <>
              <li>
                <Link className={`navbar-cart ${isActive('/cart') ? 'is-active' : ''}`} to="/cart">
                  Cart
                  <span className="navbar-cart-count">{cartCount}</span>
                </Link>
              </li>
              <li><Link className={isActive('/profile') ? 'is-active' : ''} to="/profile">Profile</Link></li>
              <li><Link className={isActive('/orders') ? 'is-active' : ''} to="/orders">My Orders</Link></li>
              <li><button className="navbar-logout" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link className={isActive('/customer-login') ? 'is-active' : ''} to="/customer-login">Customer Login</Link></li>
              <li><Link className="navbar-cta" to="/customer-signup">Customer Signup</Link></li>
              <li><Link className={isActive('/admin-login') ? 'is-active' : ''} to="/admin-login">Admin Login</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
