// File: frontend/src/components/Header.jsx

import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Header.css';

// SVG Icon Components
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useContext(CartContext); // CORRECTED: Use getCartItemCount
  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();
  
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef(null);

  const totalCartItems = getCartItemCount(); // CORRECTED: Call the function

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];
  
  useEffect(() => {
    const activeLink = navRef.current?.querySelector('.nav-link.active');
    if (activeLink) {
      setHighlightStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1
      });
    }
  }, [location]);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <div className="logo-icon">FG</div>
          <span className="logo-text">FreshGrocer</span>
        </Link>

        <nav className="nav-links" ref={navRef}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              {item.label}
            </NavLink>
          ))}
          <span className="nav-highlight" style={highlightStyle} />
        </nav>

        <div className="header-actions">
          <div className="search-wrapper">
            <SearchIcon />
            <input type="text" placeholder="Search products..." className="search-input" />
          </div>

          {isLoggedIn ? (
            <>
            <Link to="/my-orders" className="action-button">My Orders</Link>
            <button onClick={logout} className="action-button">Logout</button>
            </>
            ) : (
                <Link to="/login" className="action-button">
                <UserIcon />
                <span>Login</span>
                </Link>
            )}

          {/* CORRECTED: Changed to NavLink */}
          <NavLink to="/cart" className="cart-button">
            <CartIcon />
            {totalCartItems > 0 && (
              <span className="cart-badge">{totalCartItems}</span>
            )}
          </NavLink>

          <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav Code would go here if needed */}
    </header>
  );
}