// File: frontend/src/App.jsx

import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './context/CartContext.jsx';
import { sampleProducts } from './data/products.js';
import './App.css'; // Import the main stylesheet for the home page

// SVG Icons
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const LeafIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10v-2a3 3 0 0 1-3-3z"/><path d="M12 4a10 10 0 0 0-10 10h2a7 7 0 0 1 7-7v2a3 3 0 0 1 3 3h2a10 10 0 0 0-10-10z"/></svg>;
const TruckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.63a1 1 0 0 0-.44-.82l-3.56-2.55a1 1 0 0 0-1.56.82V18Z"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>;

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Data could not be fetched!');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = sampleProducts.slice(0, 4);
  const categories = [
    { name: 'Fruits & Vegetables', count: '200+ products', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500' },
    { name: 'Bakery', count: '50+ products', image: 'https://images.unsplash.com/photo-1586443470341-2695a25197a9?w=500' },
    { name: 'Dairy', count: '80+ products', image: 'https://images.unsplash.com/photo-1620189507195-68309c04c4d2?w=500' },
    { name: 'Meat & Seafood', count: '120+ products', image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?w=500' },
  ];
  return (
    <div>
      {/* Hero Section */}
      <section className="home-hero-section home-section">
        <div className="home-content-wrapper">
          <div className="home-hero-grid">
            <div className="home-hero-content">
              <h1>
                Fresh Groceries
                <span className="highlight">Delivered Daily</span>
              </h1>
              <p>Get the freshest produce, quality meats, and everyday essentials delivered right to your door. Shop from our wide selection of premium groceries.</p>
              <div className="hero-buttons">
                <button className="btn-primary">Shop Now <ArrowRightIcon /></button>
                <button className="btn-secondary">Browse Categories</button>
              </div>
            </div>
            <div className="home-hero-image">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800" alt="Grocery Store Aisle" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section home-section">
        <div className="home-content-wrapper">
          <div className="features-grid">
            <div className="feature-item">
              <div className="icon-wrapper"><LeafIcon /></div>
              <h3>Fresh & Organic</h3>
              <p>Locally sourced, organic produce delivered fresh to your door</p>
            </div>
            <div className="feature-item">
              <div className="icon-wrapper"><TruckIcon /></div>
              <h3>Fast Delivery</h3>
              <p>Same-day delivery available with our express service</p>
            </div>
            <div className="feature-item">
              <div className="icon-wrapper"><ShieldIcon /></div>
              <h3>Quality Guaranteed</h3>
              <p>100% satisfaction guarantee on all our products</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section*/}
      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-header">
            <h2>Shop by Category</h2>
            <p>
              Explore our wide range of fresh groceries organized by category for easy shopping
            </p>
          </div>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.name} className="category-card">
                <div className="image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                  />
                </div>
                <div className="category-card-content">
                  <h3>{category.name}</h3>
                  <p>{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products-section-new">
        <div className="home-content-wrapper">
          <div className="products-header">
            <h2>Featured Products</h2>
            <p>Discover our handpicked selection of the finest products</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="new-product-card">
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
            ))}
          </div>
          <div className="view-all-container">
            <button className="btn-secondary">View All Products</button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2>Stay Updated</h2>
          <p>
            Subscribe to our newsletter to get the latest deals and fresh product updates
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
            />
            <button type="submit" className="newsletter-subscribe-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;