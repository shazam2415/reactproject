import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Ana layout bileşenimiz
import App from './App.jsx';

// Sayfalarımızı import ediyoruz
import HomePage from './pages/HomePage.jsx';
import PostsListPage from './pages/PostsListPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';
import CreatePostPage from './pages/CreatePostPage.jsx';
import EditPostPage from './pages/EditPostPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

// Ana CSS dosyamız
import './index.css';

// Rota (URL) yapılandırması
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Bütün sayfaları saran ana bileşen (Navbar, Footer burada olacak)
    children: [
      {
        index: true, // Ana yol ('/') bu sayfayı gösterecek
        element: <HomePage />,
      },
      {
        path: 'ilanlar', // '/ilanlar'
        element: <PostsListPage />,
      },
      {
        path: 'ilan/:ilanId', // Dinamik yol, örn: /ilan/123
        element: <PostDetailPage />,
      },
      {
        path: 'ilan-ver', // '/ilan-ver'
        element: <CreatePostPage />,
      },
      {
        path: 'ilan/:ilanId/duzenle', // '/ilan/123/duzenle'
        element: <EditPostPage />,
      },
      {
        path: 'giris', // '/giris'
        element: <LoginPage />,
      },
      {
        path: 'kayit-ol', // '/kayit-ol'
        element: <RegisterPage />,
      },
      {
        path: 'profil/:kullaniciId', // '/profil/abc'
        element: <ProfilePage />,
      },
      {
        path: 'panelim', // '/panelim'
        element: <DashboardPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);