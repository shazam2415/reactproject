import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen justify-center font-sans">
      <Navbar />
      <main className="flex-grow items-center justify-center w-full lg:px-96 py-10">
        <Outlet />
      </main>
      <Footer />

    </div>
  );
}

export default App;