import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/authService';
import '../styles/home.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedId(product._id);
    window.setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-inner">
          <span className="hero-eyebrow">Shop the collection</span>
          <h1>Welcome to Our E-Commerce Store</h1>
          <p>Discover our amazing products</p>
          <div className="hero-actions">
            <a href="#products" className="hero-cta-primary">Browse products</a>
            <a href="/about" className="hero-cta-secondary">Learn more</a>
          </div>
        </div>
        <svg className="hero-wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30 C 150 60 350 0 600 30 C 850 60 1050 0 1200 30 L1200 60 L0 60 Z" fill="var(--paper)" />
        </svg>
      </section>

      <section className="products-section" id="products">
        <div className="products-heading">
          <span className="products-eyebrow">Catalog</span>
          <h2>Our Products</h2>
          {!loading && (
            <p className="products-count">
              {products.length} {products.length === 1 ? 'product' : 'products'} available
            </p>
          )}
        </div>

        {loading ? (
          <div className="loading">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="products-empty">
            <p>No products yet.</p>
            <span>Check back soon — new items are added regularly.</span>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.productImage ? (
                    <img src={product.productImage} alt={product.name} />
                  ) : (
                    <span className="product-image-placeholder">No image</span>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <div className="product-footer">
                    <span className="price">${product.price}</span>
                    <button
                      className={addedId === product._id ? 'is-added' : ''}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedId === product._id ? 'Added ✓' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
