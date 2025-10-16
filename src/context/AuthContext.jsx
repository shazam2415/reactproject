// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Context'i oluştur
const AuthContext = createContext(null);

// 2. Provider Component'ini oluştur (Uygulamayı saran ana component)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Sayfa ilk yüklendiğinde token kontrolü için

  // Uygulama ilk açıldığında localStorage'ı kontrol et
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser)); // localStorage'daki string'i JSON'a çevir
      }
    } catch (error) {
      console.error("Yerel depolamadan veri okunurken hata:", error);
      // Hata durumunda temizle
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false); // Kontrol bitti, yüklenme durumunu kapat
    }
  }, []); // [] sayesinde sadece bir kere çalışır

  // Giriş yapma fonksiyonu
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData)); // Objeyi string'e çevirip sakla
  };

  // Çıkış yapma fonksiyonu
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Dışarıya sağlanacak değerler
  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token, // Token varsa true, yoksa false döner
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Yükleme bitene kadar alt component'leri render etme */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Kendi hook'umuzu oluştur (kullanımı kolaylaştırmak için)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth, AuthProvider içinde kullanılmalıdır');
  }
  return context;
};