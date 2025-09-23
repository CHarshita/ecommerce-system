// File: frontend/src/components/Header.jsx

import React, { useState, useContext, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Header.css';

// SVG Icon Components (remain the same)
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation(); // Get current location
  
  // 1. State and ref for the highlight effect
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];
  
  // 2. useEffect to calculate and set the highlight position
  useEffect(() => {
    // Find the DOM element for the active link
    const activeLink = navRef.current?.querySelector('.nav-link.active');
    
    if (activeLink) {
      setHighlightStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1
      });
    }
  }, [location]); // Re-run this effect whenever the location changes

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">FG</div>
          <span className="logo-text">FreshGrocer</span>
        </Link>

        {/* 3. Add the ref to the nav element */}
        <nav className="nav-links" ref={navRef}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              {item.label}
            </NavLink>
          ))}
          {/* 4. The moving highlight element */}
          <span className="nav-highlight" style={highlightStyle} />
        </nav>

        <div className="header-actions">
          {/* ... (rest of the actions code is the same) ... */}
          <div className="search-wrapper">
            <SearchIcon />
            <input type="text" placeholder="Search products..." className="search-input" />
          </div>

          {isLoggedIn ? (
            <button onClick={logout} className="action-button">
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="action-button">
              <UserIcon />
              <span>Login</span>
            </Link>
          )}

          <button className="cart-button">
            <CartIcon />
            {totalCartItems > 0 && (
              <span className="cart-badge">{totalCartItems}</span>
            )}
          </button>

          <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      
      {/* ... (mobile nav code is the same) ... */}
    </header>
  );
}