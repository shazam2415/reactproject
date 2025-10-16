// src/layouts/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex lg:px-96 py-10"> 
        {/* Sayfa içeriği buraya gelecek */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;