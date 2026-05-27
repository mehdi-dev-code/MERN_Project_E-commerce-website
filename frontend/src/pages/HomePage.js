import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/authService';
import '../styles/home.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    alert('Product added to cart!');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Our E-Commerce Store</h1>
        <p>Discover our amazing products</p>
      </section>

      <section className="products-section">
        <h2>Our Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {product.productImage && (
                <img src={product.productImage} alt={product.name} />
              )}
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">${product.price}</p>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;