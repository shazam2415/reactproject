// src/api/axiosConfig.js

import axios from 'axios';

// 1. Yeni bir Axios "instance" oluştur
const apiClient = axios.create({
  // .env dosyasından okuduğumuz temel URL'i buraya koy
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 2. Axios Interceptor (Araya Girici) oluştur
// Bu kod, frontend'den backend'e giden HER BİR İSTEK'ten hemen önce çalışır.
apiClient.interceptors.request.use(
  (config) => {
    // localStorage'dan token'ı al
    const token = localStorage.getItem('token');
    
    // Eğer token varsa, isteğin headers kısmına Authorization başlığını ekle
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Değiştirilmiş config ile isteğin devam etmesini sağla
    return config;
  },
  (error) => {
    // İstek hatası olursa ne yapılacağı
    return Promise.reject(error);
  }
);

// Yapılandırılmış apiClient'i dışarıya aktar
export default apiClient;