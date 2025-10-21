import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { LogOut as FaLogout } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useAuth(); // YENİ: Context'ten kullanıcı bilgisi ve logout fonksiyonunu al
  const isLoggedIn = !!user; // user objesi varsa true, yoksa false olacak

  // Kullanıcının giriş yapıp yapmadığını kontrol etmek için geçici state
  // Gerçek projede bu bilgi Context API veya Supabase'den gelecek
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mobil menünün açık olup olmadığını kontrol eden state

  // NavLink için stil fonksiyonu
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? 'bg-blue-500 px-3 py-2 text-white    text-sm font-medium font-bold border border-blue-500'
      : 'bg-white px-3 py-2 text-blue-500 text-sm font-medium font-bold border border-blue-500';

  return (
    <nav className="flex items-center justify-center bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center justify-between h-fit py-4 w-full max-w-4xl">

          {/* Sol Taraf: Logo ve Ana Linkler (Desktop) */}
          <div className="flex items-center justify-center">
            <Link to="/" className="flex flex-row items-center justify-center">
              <img src="/src/assets/logo.svg" alt="" className='w-24 h-auto' />
            </Link>
            <h1 className='text-2xl font-bold text-blue-600'> Evine<br/>Dön </h1>
          </div>

          {/* Sağ Taraf: Butonlar ve Profil (Desktop) */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-4">

              {isLoggedIn ? (
                <>
                  <NavLink to="/panelim" className={navLinkStyles}>
                    Panel
                  </NavLink>

                  {user?.avatarUrl ? (
                    <Link to="/profilim" className={navLinkStyles}>
                      <img src={user.avatarUrl} alt="Profil" className="w-10 h-10 rounded-full border border-blue-600 object-cover mr-2 inline-block" />
                    </Link>
                  ) : (
                    <Link to="/profilim" className={navLinkStyles}>
                      <FaUserCircle className="w-10 h-10 text-gray-400 mr-2 inline-block" />
                    </Link>
                  )}

                  <button onClick={logout} className="text-gray-500 hover:text-gray-600">
                    <FaLogout className='text-red-600' />
                  </button>
                </>
              ) : (
                <NavLink to="/giris" className={navLinkStyles}>
                  Giriş Yap
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Menüyü aç</span>
              {/* Hamburger Icon */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                // Kapatma (X) Icon
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü (Açık olduğunda görünür) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 lg:hidden bg-white w-full border" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/ilanlar" className={navLinkStyles + ' block bg-gray-800 text-gray-500'} onClick={() => { setIsMenuOpen(false); }}>Tüm İlanlar</NavLink>
            <NavLink to="/ilan-ver" className={navLinkStyles + ' block bg-gray-800 text-gray-500'} onClick={() => { setIsMenuOpen(false); }}>Yeni İlan Ver</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to="/panelim" className={navLinkStyles + ' block bg-gray-800 text-gray-500'}>Panelim</NavLink>
                <button onClick={logout} className="text-gray-600 hover:bg-gray-200 w-full text-left px-3 py-2 rounded-md text-sm font-medium">
                  Çıkış Yap
                </button>
              </>
            ) : (
              <NavLink to="/giris" className={navLinkStyles + ' block bg-gray-800 text-gray-500'} onClick={() => { setIsMenuOpen(false); }}>Giriş Yap / Kayıt Ol</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;