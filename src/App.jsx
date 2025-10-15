import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    // Ana kapsayıcı: Tüm sayfayı kaplar ve içeriği dikeyde (sütun olarak) sıralar
    // bg-gray-50 ile hafif bir arka plan rengi veriyoruz
    <div className="flex flex-col min-h-screen justify-center font-sans">
      
      {/* Tüm sayfalarda en üstte görünecek olan Navbar bileşeni */}
       <Navbar /> 

      {/* Sayfaların dinamik içeriğinin geleceği ana alan */}
      {/* flex-grow: Navbar ve Footer dışındaki tüm boşluğu doldurmasını sağlar */}
      <main className="flex-grow items-center justify-center w-full px-96 py-10">
        
        {/* React Router, o anki URL'ye uygun olan sayfa bileşenini
            tam olarak bu <Outlet />'in olduğu yere yerleştirir. */}
        <Outlet />
        
      </main>
      
      {/* Tüm sayfalarda en altta görünecek olan Footer bileşeni */}
      <Footer />

    </div>
  );
}

export default App;