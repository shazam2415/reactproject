import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  // Kullanıcının giriş yapıp yapmadığını kontrol etmek için geçici state
  // Gerçek projede bu bilgi Context API veya Supabase'den gelecek
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mobil menünün açık olup olmadığını kontrol eden state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // NavLink için stil fonksiyonu
  const navLinkStyles = ({ isActive }) => 
    isActive 
      ? 'bg-gray-500 px-3 py-2 text-gray-500 rounded-md text-sm font-medium' 
      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-fit py-4">
          
          {/* Sol Taraf: Logo ve Ana Linkler (Desktop) */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              🐾 Evine Dön
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/ilanlar" className={navLinkStyles}>
                  Tüm İlanlar
                </NavLink>
                {/* Buraya başka ana linkler eklenebilir */}
              </div>
            </div>
          </div>

          <section>
            <div className="w-[30vw] bg-red-200">
              <div className="flex flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Şehir veya ilçe ara..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button className="w-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md">
                  Ara
                </button>
              </div>
            </div>
          </section>

          {/* Sağ Taraf: Butonlar ve Profil (Desktop) */}
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              <Link
                to="/ilan-ver"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-md transition duration-300"
              >
                Yeni İlan Ver
              </Link>
              {isLoggedIn ? (
                <>
                  <NavLink to="/panelim" className={navLinkStyles}>
                    Panelim
                  </NavLink>
                  <button onClick={() => setIsLoggedIn(false)} className="text-gray-600 hover:text-gray-900">
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <NavLink to="/giris" className={navLinkStyles}>
                  Giriş Yap / Kayıt Ol
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
            <NavLink to="/ilanlar" className={navLinkStyles + ' block'}>Tüm İlanlar</NavLink>
            <NavLink to="/ilan-ver" className={navLinkStyles + ' block'}>Yeni İlan Ver</NavLink>
            {isLoggedIn ? (
              <>
                <NavLink to="/panelim" className={navLinkStyles + ' block'}>Panelim</NavLink>
                <button onClick={() => { setIsLoggedIn(false); setIsMenuOpen(false); }} className="text-gray-600 hover:bg-gray-200 w-full text-left px-3 py-2 rounded-md text-sm font-medium">
                  Çıkış Yap
                </button>
              </>
            ) : (
              <NavLink to="/giris" className={navLinkStyles + ' block'}>Giriş Yap / Kayıt Ol</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;