import React, { useContext } from 'react'; // 1. Import useContext
import { CartContext } from '../context/CartContext.jsx'; // 2. Import the context

// 3. Remove props from the function definition
function Cart() {
  // 4. Get cart and setCart directly from the context
  const { cart, setCart } = useContext(CartContext);

  // The rest of your component logic stays exactly the same
  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.ProductID !== productId);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.Price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <ul className="cart-items">
        {cart.map(item => (
          <li key={item.ProductID} className="cart-item">
            <span className="item-name">{item.Name}</span>
            <span className="item-quantity">Qty: {item.quantity}</span>
            <span className="item-price">${(item.Price * item.quantity).toFixed(2)}</span>
            <button onClick={() => handleRemoveItem(item.ProductID)} className="remove-btn">Remove</button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h3>Total: ${calculateTotal()}</h3>
      </div>
    </div>
  );
}

export default Cart;