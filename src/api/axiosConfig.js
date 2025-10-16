// src/api/axiosConfig.js

import axios from 'axios';
import { toast } from 'react-toastify';

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

apiClient.interceptors.response.use(
  // Başarılı yanıtlar için hiçbir şey yapma, sadece devam etsin
  (response) => response,

  // Hatalı yanıtlar için bu fonksiyon çalışır
  async (error) => {
    // Eğer gelen hata 401 (Unauthorized) ise
    if (error.response && error.response.status === 401) {
      
      // localStorage'daki geçersiz token ve kullanıcı bilgisini temizle
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Kullanıcıya bir bildirim göster
      toast.error('Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.');
      
      // Kullanıcıyı giriş sayfasına yönlendir.
      // Not: Bu dosya bir component olmadığı için useNavigate kullanamayız.
      // window.location en basit ve en etkili yöntemdir.
      window.location.href = '/giris';
    }

    // Diğer tüm hatalar için, hatanın devam etmesine izin ver ki
    // component'ler kendi catch bloklarında onu yakalayabilsin.
    return Promise.reject(error);
  }
);

// Yapılandırılmış apiClient'i dışarıya aktar
export default apiClient;