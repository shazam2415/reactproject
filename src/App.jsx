// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './Layout';
import ProtectedRoute from './components/ProtectedRoute'; // YENİ: Korumamızı import et

// ... (tüm sayfa component'lerini import et)
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import EditPostPage from './pages/EditPostPage';
import PostsListPage from './pages/PostsListPage'
import PostDetailPage from './pages/PostDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'


// ...

function App() {
  return (
    <>
    <Routes>
      {/* 1. Kısım: Herkesin görebileceği, Navbar'lı sayfalar */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="ilanlar" element={<PostsListPage />} />
        <Route path="ilanlar/:ilanId" element={<PostDetailPage />} />

        {/* --- YENİ KORUMALI ALAN --- */}
        {/* Sadece giriş yapmış kullanıcıların erişebileceği sayfalar */}
        <Route element={<ProtectedRoute />}>
          <Route path="ilan-ver" element={<CreatePostPage />} />
          <Route path="panelim" element={<DashboardPage />} />
          <Route path="profilim" element={<ProfilePage />} />
          <Route path="ilanlar/:ilanId/duzenle" element={<EditPostPage />} />
          {/* <Route path="panelim" element={<DashboardPage />} /> */}
        </Route>
        {/* --------------------------- */}

      </Route>

      {/* 2. Kısım: Navbar'sız, herkese açık sayfalar */}
      <Route path="/giris" element={<LoginPage />} />
      <Route path="/kayit-ol" element={<RegisterPage />} />
    </Routes>

    <ToastContainer
        position="top-right" // Bildirimler sağ üst köşede çıksın
        autoClose={3000}     // 3 saniye sonra otomatik kapansın
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"      // Teması (light, dark, colored)
      />
    </>
  );
}

export default App;