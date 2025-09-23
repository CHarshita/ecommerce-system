// File: frontend/src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductCard.css';

export function ProductCard({ product }) {
  const { handleAddToCart } = useContext(CartContext);

  return (
    <div className="new-product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} />
        <div className="product-category-tag">{product.category}</div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-bottom">
          <p className="product-price">₹{product.price}</p>
          <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
            <span className="add-to-cart-btn-icon">+</span> Add
          </button>
        </div>
      </div>
    </div>
  );
}