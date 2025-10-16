import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('null');

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });

      const { user, token } = response.data;

      login( user, token );

      navigate('/');
    } catch (err) {
      console.error('Giriş sırasında hata oluştu:', err);

      const errorMessage = err.response?.data?.error || 'Giriş yapılamadı, lütfen bilgilerinizi kontrol ediniz.';
      setError(errorMessage);
    } finally {
      setLoading(false); // İşlem bitince yüklenme durumunu kapat
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <Link to="/" className="text-xl font-bold text-blue-600">
              🐾 Evine Dön
            </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Hesabınıza Giriş Yapın
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4  sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta Adresi
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>

              {/* Hata mesajını burada göster */}
              {error && <p className="text-sm text-center text-red-600">{error}</p>}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
               {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-600">
          Hesabın yok mu?{' '}
          <Link to="/kayit-ol" className="font-medium text-blue-600 hover:underline">
            Kayıt Ol
          </Link>
        </p>
        </div>
      </div>
      <div className="text-xl font-bold">
        <p className="text-sm text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Evine Dön. Tüm hakları saklıdır.
          </p>
      </div>
    </div>
  );
}

export default LoginPage;