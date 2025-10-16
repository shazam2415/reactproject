// src/pages/PostsListPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig.js';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import { FaSearch } from 'react-icons/fa';

function PostsListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // YENİ: İki yeni state ekledik
  const [searchTerm, setSearchTerm] = useState(''); // Arama kutusunun anlık değerini tutar
  const [query, setQuery] = useState(''); // Gerçekleşecek olan aramayı tetikler

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        // URL'yi dinamik olarak oluştur
        const url = query ? `/posts?search=${query}` : '/posts';
        const response = await apiClient.get(url);
        setPosts(response.data);
        setError(null);
      } catch (err) {
        console.error("Tüm ilanlar çekilirken hata oluştu:", err);
        setError('İlanlar yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [query]); // useEffect artık 'query' state'ine bağlı, query değişince yeniden çalışacak

  // YENİ: Arama formu gönderildiğinde çalışır
  const handleSearch = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    setQuery(searchTerm); // Asıl aramayı tetikle
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Tüm İlanlar</h1>

      {/* --- YENİ ARAMA FORMU --- */}
      <div className="mb-8 max-w-lg mx-auto">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="İlan başlığında ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            <FaSearch />
          </button>
        </form>
      </div>
      {/* ------------------------- */}

      {loading ? (
        <div className="flex justify-center items-center h-64"><Spinner /></div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          Aramanızla eşleşen bir ilan bulunamadı.
        </p>
      )}
    </div>
  );
}

export default PostsListPage;