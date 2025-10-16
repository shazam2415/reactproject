import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard'; // İlan kartı component'in
import Spinner from '../components/Spinner';   // Yükleniyor ikonu component'in
import apiClient from '../api/axiosConfig';

function PostsListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Component ilk render edildiğinde çalışacak fonksiyon
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/posts');
        setPosts(response.data); // Backend'den gelen tüm veriyi state'e ata
        setError(null);
      } catch (err) {
        console.error("Tüm ilanlar çekilirken hata oluştu:", err);
        setError('İlanlar yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []); // Bağımlılık dizisi boş olduğu için bu kod sadece bir kere çalışır

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Tüm İlanlar</h1>
      
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">Gösterilecek hiç ilan bulunamadı.</p>
      )}
    </div>
  );5173
}

export default PostsListPage;