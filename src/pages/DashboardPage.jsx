// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig.js';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

// Component adını DashboardPage olarak değiştir
function DashboardPage() { 
  const { user } = useAuth(); // Sadece user bilgisi yeterli, token'a gerek yok
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await apiClient.get('/posts/my-posts');
        setMyPosts(response.data);
      } catch (err) {
        console.error("İlanlarım çekilirken hata:", err);
        setError('İlanlar yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, []); // Bağımlılık dizisi boş kalabilir

  if (loading) return <div className="flex justify-center mt-20"><Spinner /></div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        {/* Başlığı Dashboard'a uygun hale getir */}
        <h1 className="text-4xl font-bold text-gray-800">Panelim</h1> 
        <p className="text-lg text-gray-600 mt-2">Hoş geldin {user?.name}, bu sayfada yayınladığın ilanları yönetebilirsin.</p>
      </div>
      
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">İlanlarım ({myPosts.length})</h2>
      {myPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">Henüz hiç ilan oluşturmadın.</p>
          <Link to="/ilan-ver" className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
            İlk İlanını Oluştur
          </Link>
        </div>
      )}
    </div>
  );
}

export default DashboardPage; // export adını da değiştir