// File: frontend/src/pages/CheckoutPage.jsx

import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CheckoutPage.css';

// SVG Icons
const TruckIcon = () => <svg className="checkout-icon" viewBox="0 0 24 24"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.63a1 1 0 0 0-.44-.82l-3.56-2.55a1 1 0 0 0-1.56.82V18Z"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></svg>;
const ClockIcon = () => <svg className="checkout-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>;
const CreditCardIcon = () => <svg className="checkout-icon" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;


export function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: 'CA', zipCode: '',
    deliveryTime: 'standard', paymentMethod: 'card', cardName: '', cardNumber: '', expiryDate: '', cvv: ''
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Submitted:', { orderDetails: formData, items: cartItems, total: total.toFixed(2) });
    setIsOrderPlaced(true);
    clearCart();
  };

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const deliveryFee = formData.deliveryTime === 'express' ? 500.00 : 0;
  const total = subtotal + tax + deliveryFee;

  if (isOrderPlaced) {
    return (
      <div className="checkout-page-wrapper">
        <div className="order-success-message">
          <h2>Thank you for your order!</h2>
          <p>Your order has been placed successfully. A confirmation email has been sent.</p>
          <NavLink to="/products" className="btn-primary">Continue Shopping</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-wrapper">
      <div className="home-content-wrapper">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order</p>
        </div>
        
        <form onSubmit={handleSubmit} className="checkout-layout-grid">
          <div className="checkout-form-column">
            {/* Delivery Info */}
            <div className="checkout-card">
              <h3 className="checkout-card-title"><TruckIcon /> Delivery Information</h3>
              <div className="form-grid-2-col">
                <div><label>First Name</label><input value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} required /></div>
                <div><label>Last Name</label><input value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} required /></div>
                <div><label>Email</label><input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} required /></div>
                <div><label>Phone</label><input value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} required /></div>
              </div>
              <div><label>Address</label><input value={formData.address} onChange={e => handleInputChange('address', e.target.value)} required /></div>
              <div className="form-grid-3-col">
                <div><label>City</label><input value={formData.city} onChange={e => handleInputChange('city', e.target.value)} required /></div>
                <div>
                  <label>State</label>
                  <select value={formData.state} onChange={e => handleInputChange('state', e.target.value)}>
                    <option value="CA">California</option><option value="NY">New York</option><option value="TX">Texas</option><option value="FL">Florida</option>
                  </select>
                </div>
                <div><label>ZIP Code</label><input value={formData.zipCode} onChange={e => handleInputChange('zipCode', e.target.value)} required /></div>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="checkout-card">
              <h3 className="checkout-card-title"><ClockIcon /> Delivery Time</h3>
              <div className="radio-group">
                <label className={`radio-option ${formData.deliveryTime === 'standard' ? 'selected' : ''}`}>
                  <input type="radio" name="deliveryTime" value="standard" checked={formData.deliveryTime === 'standard'} onChange={e => handleInputChange('deliveryTime', e.target.value)} />
                  <div><strong>Standard Delivery</strong><p>2-3 business days • Free</p></div>
                </label>
                <label className={`radio-option ${formData.deliveryTime === 'express' ? 'selected' : ''}`}>
                  <input type="radio" name="deliveryTime" value="express" checked={formData.deliveryTime === 'express'} onChange={e => handleInputChange('deliveryTime', e.target.value)} />
                  <div><strong>Express Delivery</strong><p>Same day delivery • ₹500.00</p></div>
                </label>
              </div>
            </div>

            {/* Payment Info */}
            <div className="checkout-card">
              <h3 className="checkout-card-title"><CreditCardIcon /> Payment Information</h3>
              {/* Simplified for brevity */}
              <div><label>Name on Card</label><input value={formData.cardName} onChange={e => handleInputChange('cardName', e.target.value)} required /></div>
              <div><label>Card Number</label><input placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={e => handleInputChange('cardNumber', e.target.value)} required /></div>
              <div className="form-grid-2-col">
                <div><label>Expiry Date</label><input placeholder="MM/YY" value={formData.expiryDate} onChange={e => handleInputChange('expiryDate', e.target.value)} required /></div>
                <div><label>CVV</label><input placeholder="123" value={formData.cvv} onChange={e => handleInputChange('cvv', e.target.value)} required /></div>
              </div>
            </div>
          </div>

          <div className="checkout-summary-column">
            <div className="checkout-card summary-card">
              <h3 className="checkout-card-title">Order Summary</h3>
              <div className="summary-item-list">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <img src={item.image} alt={item.name} />
                    <div><p>{item.name}</p><p>Qty: {item.quantity}</p></div>
                    <p>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="summary-details">
                <p><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></p>
                <p><span>Delivery Fee</span><span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee.toFixed(2)}`}</span></p>
                <p><span>Tax (8%)</span><span>₹{tax.toFixed(2)}</span></p>
                <div className="summary-total"><p><span>Total</span><span>₹{total.toFixed(2)}</span></p></div>
              </div>
              <button type="submit" className="btn-primary place-order-btn">Place Order</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}