// File: main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import App from './App.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx'; 
import { RootLayout } from './components/RootLayout.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { CheckoutPage } from './pages/CheckoutPage.jsx';
import './index.css';

// --- CORRECTED ROUTER SETUP ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // The RootLayout is the parent element
    children: [
      { 
        index: true, // This makes App the default child route for "/"
        element: <App /> 
      }, { path: "about", element: <AboutPage /> },
      { path: "products", element: <ProductPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      // You can add other child pages here later that will share the same header
      // { path: "products", element: <ProductsPage /> },
    ]
  },
  {
    path: "/register",
    element: <Register />, // This page does not use the RootLayout
  },
  {
    path: "/login",
    element: <Login />, // This page does not use the RootLayout
  },
]);


const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);