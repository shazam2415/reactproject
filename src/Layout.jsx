// src/layouts/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex bg-gray-100 items-center justify-center min-h-screen py-10">
        <div className="flex w-full max-w-4xl">
        <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;