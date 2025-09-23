// File: frontend/src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css';

// SVG Icons
const MinusIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const PlusIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const TrashIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const ShoppingBagIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>;

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useContext(CartContext);

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="empty-cart-container">
          <div className="empty-cart-icon"><ShoppingBagIcon /></div>
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <NavLink to="/products" className="btn-primary">Continue Shopping</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <div className="home-content-wrapper">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} items in your cart</p>
        </div>

        <div className="cart-layout-grid">
          <div className="cart-items-list">
            <div className="contact-card">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>₹{parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><MinusIcon /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><PlusIcon /></button>
                  </div>
                  <div className="cart-item-total">
                    <p>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn"><TrashIcon /></button>
                  </div>
                </div>
              ))}
              <div className="clear-cart-container">
                <button onClick={clearCart} className="clear-cart-btn">
                  <TrashIcon /> Clear Cart
                </button>
              </div>
            </div>
          </div>

          <div className="order-summary">
            <div className="contact-card">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-details">
                <p><span>Subtotal</span> <span>₹{subtotal.toFixed(2)}</span></p>
                <p><span>Delivery Fee</span> <span className="free-delivery">Free</span></p>
                <p><span>Tax (8%)</span> <span>₹{tax.toFixed(2)}</span></p>
                <div className="summary-total">
                  <p><span>Total</span> <span>₹{total.toFixed(2)}</span></p>
                </div>
              </div>
              <NavLink to="/checkout" className="btn-primary checkout-btn">Proceed to Checkout</NavLink>
              <NavLink to="/products" className="btn-secondary continue-shopping-btn">Continue Shopping</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}