// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig.js';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
// Dashboard ikonları için ikonları import edelim
import { FiFileText, FiEye, FiMessageSquare, FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

function DashboardPage() { 
  const { user } = useAuth(); 
  const [myPosts, setMyPosts] = useState([]);
  
  // İstatistikler için mock (sahte) state. Normalde bu da API'den gelmeli.
  const [stats, setStats] = useState({ totalViews: 0, messages: 0 });
  
  const [loading, setLoading] = useState(true);
  
  // Hata state'lerini ikiye ayıralım: Sayfa yükleme hatası ve eylem hatası (örn: silme)
  const [loadError, setLoadError] = useState(null);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/posts/my-posts');
        setMyPosts(response.data);

        // --- MOCK DATA (SAHTE VERİ) ---
        // Normalde bu veriler de API'den ayrı bir endpoint ile (örn: /dashboard/stats) çekilmeli.
        // Biz şimdilik burada rastgele veriler oluşturalım.
        const fakeViews = response.data.length * 150 + Math.floor(Math.random() * 500);
        const fakeMessages = Math.floor(Math.random() * 5);
        setStats({
          totalViews: fakeViews,
          messages: fakeMessages
        });
        // --- MOCK DATA SONU ---

      } catch (err) {
        console.error("İlanlarım çekilirken hata:", err);
        setLoadError('İlanlar yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, []);

  // İlan silme fonksiyonu
  const handleDelete = async (postId) => {
    // Önce kullanıcıdan onay al
    if (!window.confirm('Bu ilanı kalıcı olarak silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    setActionError(null); // Önceki hataları temizle
    try {
      await apiClient.delete(`/posts/${postId}`);
      // Başarılı silme sonrası ilanı state'ten kaldır
      setMyPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      
      // Not: Başarı mesajı için bir toast notification kütüphanesi kullanmak daha iyi olur.
      
    } catch (err) {
      console.error('İlan silinirken hata:', err);
      setActionError('İlan silinirken bir sorun oluştu. Lütfen tekrar deneyin.');
      // Hata mesajını 3 saniye sonra kaldır
      setTimeout(() => setActionError(null), 3000);
    }
  };

  // Sayfa yüklenirken tam ekran spinner
  if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;
  
  // Sayfa yüklenirken kritik bir hata oluştuysa
  if (loadError) return <p className="text-center text-red-500 mt-20">{loadError}</p>;

  return (
    // Arka planı biraz daha yumuşak bir renk yapalım
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 py-10">
        
        {/* Eylem Hataları (Silme vb.) için uyarı alanı */}
        {actionError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 relative mb-6" role="alert">
            <span className="block sm:inline">{actionError}</span>
          </div>
        )}

        {/* 1. Bölüm: Başlık ve Hızlı Eylem Butonu */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panelim</h1> 
            <p className="text-lg text-gray-600 mt-1">Hoş geldin {user?.name}, genel bakışın burada.</p>
          </div>
          <Link 
            to="/ilan-ver" 
            className="mt-4 sm:mt-0 inline-flex items-center bg-blue-600 text-white font-semibold py-2 px-5 shadow-md hover:bg-blue-700 transition duration-200"
          >
            <FiPlus className="mr-2" size={20} />
            Yeni İlan Ver
          </Link>
        </div>

        {/* 2. Bölüm: İstatistik Kartları */}
        <div className="flex flex-col mb-10">
          
          {/* Toplam İlan Kartı */}
          <div className="flex flex-row bg-white w-full p-4 shadow-md items-center transition-all duration-300 hover:shadow-lg">
            <div className="bg-blue-100 border border-blue-500 text-blue-600 p-4 rounded-full mr-4">
              <FiFileText size={28} />
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Toplam İlan</h3>
              <p className="text-3xl font-bold text-gray-800">{myPosts.length}</p>
            </div>
          </div>
        </div>

        {/* 3. Bölüm: İlanlarım Listesi */}
        <div className="bg-white p-6 sm:p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">İlanlarım</h2>
          
          {myPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPosts.map(post => (
                // Kartı yönetim butonlarını içerecek şekilde sarmalayalım
                <div key={post.id} className="relative group shadow-lg overflow-hidden">
                  <PostCard post={post} />
                  
                  {/* Yönetim Butonları (Kartın üzerine gelince belirsin) */}
                  <div className="absolute top-0 right-0 p-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link 
                      to={`/ilanlar/${post.id}/duzenle`} // Düzenleme sayfanızın yolu
                      className="bg-white p-2 rounded-full shadow-md text-blue-600 hover:bg-blue-100"
                      title="Düzenle"
                    >
                      <FiEdit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="bg-white p-2 rounded-full shadow-md text-red-600 hover:bg-red-100"
                      title="Sil"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // İlan yoksa gösterilecek mesaj
            <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
              <FiFileText size={48} className="mx-auto text-gray-400" />
              <p className="mt-4 text-lg text-gray-600">Henüz hiç ilan oluşturmadın.</p>
              <p className="text-gray-500 mt-1">"Yeni İlan Ver" butonuna tıklayarak ilk ilanını oluşturabilirsin.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default DashboardPage;