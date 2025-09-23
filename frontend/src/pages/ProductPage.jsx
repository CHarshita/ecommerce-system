// File: frontend/src/pages/ProductPage.jsx
import React, { useState, useMemo, useContext } from 'react';
import { ProductCard } from '../components/ProductCard';
import { sampleProducts } from '../data/products.js';
import { CartContext } from '../context/CartContext';
import './ProductPage.css';

const SearchIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

export function ProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { handleAddToCart } = useContext(CartContext);
  
  const categories = ['all', ...Array.from(new Set(sampleProducts.map(p => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = sampleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return parseFloat(a.price) - parseFloat(b.price);
        case 'price-high': return parseFloat(b.price) - parseFloat(a.price);
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="product-page-container">
      <div className="home-content-wrapper">
        {/* ... Product Page Header ... */}
        <div className="product-page-header">
          <h1>All Products</h1>
          <p>Discover our complete range of fresh groceries and everyday essentials</p>
        </div>

         {/* ... Filter Panel ... */}
        <div className="filter-panel">
          <div className="filter-grid">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon"><SearchIcon /></span>
            </div>
            <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((cat) => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
            </select>
            <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="price-low">Sort by Price: Low to High</option>
              <option value="price-high">Sort by Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* ... Results Info ... */}
        <p className="results-info">
          Showing {filteredAndSortedProducts.length} of {sampleProducts.length} products
        </p>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="products-grid">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products-found">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="btn-secondary" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More (placeholder) */}
        <div className="load-more-container"> {/*<-- Make sure this class is here */}
        <button className="btn-secondary">Load More Products</button>
        </div>
      </div>
    </div>
  );
}