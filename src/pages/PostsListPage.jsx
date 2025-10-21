// src/pages/PostsListPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig.js'; // Import yolu @ alias ile güncellendi
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

function PostsListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [queryParams, setQueryParams] = useState({
    search: '',
    city: '',
    status: '',
    page: 1,
  });

  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchAllPosts = async () => {
      // Not: useEffect içinde setLoading(true) kullanmak,
      // her filtre değişiminde ekranın tamamının yanıp sönmesine neden olabilir.
      // Daha iyi bir UX için, sadece ilk yüklemede veya
      // sayfa değişimi gibi büyük durumlarda true'ya çekilebilir.
      // Şimdilik basit tutuyoruz.
      setLoading(true);
      try {
        const params = new URLSearchParams(queryParams).toString();
        const response = await apiClient.get(`/posts?${params}`);
        
        if (response.data && Array.isArray(response.data.posts) && response.data.pagination) {
          setPosts(response.data.posts);
          setPagination(response.data.pagination);
        } else {
          setPosts([]);
          setPagination({});
        }
        setError(null);
      } catch (err) {
        // Eksik olan catch bloğu tamamlandı
        console.error("Tüm ilanlar çekilirken hata oluştu:", err);
        setError('İlanlar yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, [queryParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setQueryParams(prev => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setQueryParams(prev => ({ ...prev, page: newPage }));
    window.scrollTo(0, 0); // Sayfa değişince en üste git
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="absolute flex itemx-center top-4 right-5 z-50 justify-end w-fit px-5">
        <Link 
            to="/ilan-ver" 
            className="mt-4 sm:mt-0 inline-flex items-center bg-blue-600 text-white font-semibold py-2 px-5 shadow-md hover:bg-blue-700 transition duration-200"
          >
            <FiPlus className="mr-2" size={20} />
            Yeni İlan Ver
          </Link>
      </div>

      {/* Filtreleme alanı tamamlandı */}
      <div className="mb-8">
        
              <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">İlanları Keşfet</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="search"
            value={queryParams.search}
            onChange={handleFilterChange}
            placeholder="Başlıkta ara..."
            className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="city"
            value={queryParams.city}
            onChange={handleFilterChange}
            placeholder="Şehir ara..."
            className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={queryParams.status}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tüm Durumlar</option>
            <option value="kayip">Kayıp</option>
            <option value="bulundu">Bulundu</option>
          </select>
        </div>
      </div>

      {/* Eksik olan içerik render etme mantığı eklendi */}
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
          Filtrelerinizle eşleşen bir ilan bulunamadı.
        </p>
      )}

      {/* Sayfalama kısmı */}
      {!loading && posts.length > 0 && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(queryParams.page - 1)}
            disabled={queryParams.page <= 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Önceki
          </button>

          <span className="font-semibold text-gray-600">
            Sayfa {pagination.currentPage} / {pagination.totalPages}
          </span>

          <button
            onClick={() => handlePageChange(queryParams.page + 1)}
            disabled={queryParams.page >= pagination.totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
}

export default PostsListPage;