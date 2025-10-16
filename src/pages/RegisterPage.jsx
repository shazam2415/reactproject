// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== passwordConfirm) {
      setError('Girdiğiniz şifreler eşleşmiyor.');
      return; // Eşleşmiyorsa fonksiyonu burada durdur
    };

    setLoading(true);

    try {
      // Backend'deki register endpoint'ine POST isteği at
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });

      // Kayıt başarılıysa
      setSuccessMessage('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');

      // Kullanıcının başarı mesajını görmesi için 2 saniye bekle
      setTimeout(() => {
        navigate('/giris');
      }, 2000);

    } catch (err) {
      console.error('Kayıt sırasında hata oluştu:', err);
      const errorMessage = err.response?.data?.error || 'Kayıt başarısız. Lütfen tekrar deneyin.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <Link to="/" className="absolute top-0 mt-10 text-xl font-bold text-blue-600">
              🐾 Evine Dön
            </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Yeni Hesap Oluştur
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4  sm:px-10">
          <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Ad Soyad</label>
            <input
              id="name" name="name" type="text" required
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">E-posta</label>
            <input
              id="email" name="email" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Şifre</label>
            <input
              id="password" name="password" type="password" required minLength="6"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* YENİ İNPUT ALANI */}
          <div>
            <label htmlFor="passwordConfirm" className="text-sm font-medium text-gray-700">Şifre Tekrar</label>
            <input
              id="passwordConfirm" name="passwordConfirm" type="password" required minLength="6"
              value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          {successMessage && <p className="text-sm text-center text-green-600">{successMessage}</p>}

          <div>
            <button
              type="submit" disabled={loading}
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {loading ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}
            </button>
          </div>
        </form>
           <p className="mt-8 text-center text-sm text-gray-600">
          Zaten bir hesabın var mı?{' '}
          <Link to="/giris" className="font-medium text-blue-600 hover:text-blue-500">
            Giriş yap
          </Link>
        </p>
        </div>
      </div>
      <div className="absolute bottom-10 text-xl font-bold">
        <p className="text-sm text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Evine Dön. Tüm hakları saklıdır.
          </p>
      </div>
    </div>
  );
}

export default RegisterPage;