import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        
        {/* Üst Kısım: Linkler ve Bülten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* 1. Sütun: Marka ve Açıklama */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">🐾 Evine Dön</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Kayıp dostlarımızı yuvalarına kavuşturmak için bir araya geldik. Sevgiyle bağlan, umutla paylaş.
            </p>
          </div>

          {/* 2. Sütun: Ana Linkler */}
          <div>
            <h3 className="text-md font-semibold text-white tracking-wider">SİTE HARİTASI</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/ilanlar" className="hover:text-blue-400 transition-colors">Tüm İlanlar</Link></li>
              <li><Link to="/hakkimizda" className="hover:text-blue-400 transition-colors">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="hover:text-blue-400 transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* 3. Sütun: Yasal ve Yardım */}
          <div>
            <h3 className="text-md font-semibold text-white  tracking-wider">YASAL</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/gizlilik-politikasi" className="hover:text-blue-400 transition-colors">Gizlilik Politikası</Link></li>
              <li><Link to="/kullanim-kosullari" className="hover:text-blue-400 transition-colors">Kullanım Koşulları</Link></li>
              <li><Link to="/sss" className="hover:text-blue-400 transition-colors">Sıkça Sorulan Sorular</Link></li>
            </ul>
          </div>
          
          {/* 4. Sütun: Bülten Kaydı */}
          <div>
            <h3 className="text-md font-semibold text-white  tracking-wider">BÜLTENE ABONE OL</h3>
            <p className="mt-4 text-gray-400 text-sm">Gelişmelerden ve özel haberlerden ilk sen haberdar ol.</p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="E-posta adresiniz"
                className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors w-full sm:w-auto"
              >
                Kaydol
              </button>
            </form>
          </div>

        </div>

        {/* Ayırıcı Çizgi */}
        <hr className="my-8 border-gray-700" />

        {/* Alt Kısım: Telif Hakkı ve Sosyal Medya */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Evine Dön. Tüm hakları saklıdır.
          </p>
          <div className="flex mt-4 sm:mt-0 space-x-5">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;