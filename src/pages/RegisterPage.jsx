// src/pages/RegisterPage.jsx
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <Link to="/" className="text-xl font-bold text-blue-600">
              🐾 Evine Dön
            </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Yeni Hesap Oluştur
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Zaten bir hesabın var mı?{' '}
          <Link to="/giris" className="font-medium text-blue-600 hover:text-blue-500">
            Giriş yap
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4  sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-posta Adresi
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
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
                  required
                  className="block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Şifre (Tekrar)
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="block w-full appearance-none border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Kayıt Ol
              </button>
            </div>
          </form>
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

export default RegisterPage;