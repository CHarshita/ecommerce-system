// File: my-ecommerce-frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function fetches data from your backend API
    const fetchProducts = async () => {
      try {
        // The URL must match where your backend is running
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const data = await response.json();
        setProducts(data); // Store the fetched products
      } catch (error) {
        setError(error.message); // Store any errors
      } finally {
        setIsLoading(false); // We are done loading
      }
    };

    fetchProducts();
  }, []); // The empty [] means this only runs once

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>My E-commerce Store</h1>
      </header>
      <main className="products-container">
        {products.map(product => (
          <div key={product.ProductID} className="product-card">
            <h2>{product.Name}</h2>
            <p>{product.Description}</p>
            <p className="price">${parseFloat(product.Price).toFixed(2)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;