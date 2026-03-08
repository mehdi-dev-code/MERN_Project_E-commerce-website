import api from './api';

// Auth API calls
export const authAPI = {
  customerSignup: (userData) => api.post('/auth/customer-signup', userData),
  customerLogin: (credentials) => api.post('/auth/customer-login', credentials),
  adminLogin: (credentials) => api.post('/auth/admin-login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Product API calls
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
};

// Order API calls
export const orderAPI = {
  getAll: () => api.get('/orders'),
  getMyOrders: () => api.get('/orders/my-orders'),
  create: (orderData) => api.post('/orders', orderData),
  updateStatus: (id, status) => api.put(`/orders/${id}`, { status }),
  delete: (id) => api.delete(`/orders/${id}`),
};

// Customer API calls
export const customerAPI = {
  getAll: () => api.get('/customers/all'),
  getProfile: () => api.get('/customers/profile'),
  updateProfile: (profileData) => api.put('/customers/profile', profileData),
  delete: (id) => api.delete(`/customers/${id}`),
};

// Feedback API calls
export const feedbackAPI = {
  getAll: () => api.get('/feedback'),
  create: (feedbackData) => api.post('/feedback', feedbackData),
  delete: (id) => api.delete(`/feedback/${id}`),
};
