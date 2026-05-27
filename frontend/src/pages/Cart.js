import React, { useState, useEffect, useCallback } from 'react';
import '../styles/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  };

  // ✅ FIX — wrap in useCallback so it's safe to add to useEffect deps
  const loadCart = useCallback(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Proceeding to checkout...');
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => removeFromCart(index)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Total: ${total}</p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
