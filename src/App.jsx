import Layout from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostsListPage from './pages/PostsListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPage';


function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/ilanlar" element={<PostsListPage />} />
        <Route path="/ilan-ver" element={<CreatePostPage />} />
        <Route path="/panelim" element={<DashboardPage />} />
        <Route path="/ilan/:ilanId/duzenle" element={<EditPostPage />} />
        <Route path="/ilan/:ilanId" element={<PostDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/kayit-ol" element={<RegisterPage />} />
      </Routes>

  );
}

export default App;