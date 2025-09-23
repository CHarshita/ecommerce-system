// File: frontend/src/pages/Login.jsx

import React, { useState, useContext, useEffect } from 'react'; // Add useEffect
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Add useLocation
import { AuthContext } from '../context/AuthContext.jsx';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // ADDED: State for success message
  const navigate = useNavigate();
  const location = useLocation(); // ADDED: Hook to access location state
  const { login } = useContext(AuthContext);

  // ADDED: useEffect to check for a message from the registration page
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); // Clear messages on new submission
    
    const result = await login(email, password);
    if (result.success) {
      navigate('/'); // Redirect to homepage on successful login
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Account Access</h2>
        <p>Sign in to your account or create a new one</p>

        <div className="auth-tabs">
          <Link to="/login" className="auth-tab active">Sign In</Link>
          <Link to="/register" className="auth-tab">Sign Up</Link>
        </div>

        {/* ADDED: Conditionally render success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;