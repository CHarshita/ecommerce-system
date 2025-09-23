// File: frontend/src/components/RootLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export function RootLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> 
      </main>
      {/* You can add a Footer component here later */}
    </div>
  );
}