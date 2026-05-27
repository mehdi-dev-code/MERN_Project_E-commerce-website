import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/admin.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    productImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin-login');
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'productImage') {
      setFormData({
        ...formData,
        productImage: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('description', formData.description);
      if (formData.productImage) {
        data.append('productImage', formData.productImage);
      }

      // ✅ FIX 1 — removed unused 'response' variable
      await api.post('/products', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Product added successfully!');
      setFormData({
        name: '',
        price: '',
        description: '',
        productImage: null,
      });
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/products/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setSuccess('Product deleted successfully!');
        fetchProducts();
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting product');
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Manage Products</h1>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="admin-container">
        <div className="add-product-form">
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                name="productImage"
                onChange={handleInputChange}
                accept="image/*"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>

        <div className="products-list">
          <h2>Products ({products.length})</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                {/* ✅ FIX 2 — Cloudinary returns full URL directly */}
                {product.productImage && (
                  <img
                    src={product.productImage}
                    alt={product.name}
                    className="product-image"
                  />
                )}
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="description">{product.description}</p>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
