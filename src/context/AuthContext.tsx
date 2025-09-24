import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 1. Import it
import router from './router'; // Assuming your router is in a separate file
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* 2. Wrap your RouterProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);