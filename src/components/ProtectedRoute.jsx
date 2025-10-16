// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner'; // Yükleniyor ikonu

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // AuthContext, localStorage'dan token'ı okurken bir yüklenme süresi olabilir.
  // Bu süre boyunca bir yükleme göstergesi göstermek en doğrusudur.
  // Bu, sayfa yenilendiğinde kullanıcının anlık olarak giriş sayfasına atılmasını engeller.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Yüklenme bittiğinde, kullanıcının giriş yapıp yapmadığını kontrol et
  // Giriş yapmışsa, gitmek istediği sayfayı (`<Outlet />`) göster.
  // Giriş yapmamışsa, onu `<Navigate>` ile giriş sayfasına yönlendir.
  return isAuthenticated ? <Outlet /> : <Navigate to="/giris" replace />;
}

export default ProtectedRoute;