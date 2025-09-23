import React, { createContext, useState } from 'react';

// 1. Create the context
export const CartContext = createContext();

// 2. Create the provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.ProductID === productToAdd.ProductID);
      if (existingProduct) {
        alert(`${productToAdd.Name} is already in the cart!`);
        return prevCart;
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
  };

  // The value prop is what gets shared with all components
  return (
    <CartContext.Provider value={{ cart, setCart, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};