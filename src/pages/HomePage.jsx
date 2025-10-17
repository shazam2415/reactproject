import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext'i import ediyoruz
import PostCard from '../components/PostCard'; // Kendi PostCard component'in
import Spinner from '../components/Spinner';
import { ChevronRight } from 'lucide-react';
import apiClient from '../api/axiosConfig';

const samplePost = [
  {id:1}
]
function HomePage() {

  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await apiClient.get('/posts');
        const recentPosts = response.data.posts;
        setPosts(recentPosts.slice(0, 3)); // En son 6 ilanı al
      } catch (err) {
        console.error("Son ilanlar çekilirken hata:", err);
        setError('İlanlar yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);


  const HeroSection = () => {
    if (isAuthenticated) {
      return (
        <div className="text-center bg-white p-8 border-2 shadow-md mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Tekrar hoş geldin, {user.name}!</h1>
          <p className="mt-4 text-lg text-gray-600">
            Kayıp dostlarımızı bulmaya yardım etmeye hazır mısın?
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/ilan-ver"
              className="px-6 py-3 bg-blue-600 text-white font-semibold  shadow-md hover:bg-blue-700 transition-colors"
            >
              Yeni İlan Ver
            </Link>
            <Link
              to="/profilim"
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold  hover:bg-gray-300 transition-colors"
            >
              Profilim
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-12">
          {/* 1. Hero Section: Karşılama Alanı */}
          <section className="flex flex-col items-center justify-center text-center  p-4   space-y-4  max-w-[1200px]">
            <h1 className="lg:text-5xl text-2xl font-extrabold text-gray-800">
              Kayıp Dostlarımızı <span className="font-bold text-blue-600">Evine Dön</span>dürelim
            </h1>
            <div className="flex lg:flex-row flex-col items-center justify-between lg:space-y-0 space-y-4 p-2 lg:space-x-2 w-full">
              <p className="text-sm lg:text-xl text-gray-600 w-full p-1">
                <span className="font-bold text-blue-600">Evine Dön</span>, kaybolan evcil hayvanlarınızı bulmanıza veya bulduğunuz sahipsiz dostlarımızı yuvalarına kavuşturmanıza yardımcı olan bir topluluk platformudur.
              </p>
              <img src="/exotic-pet-home.jpg" alt="" className="lg:h-64 h-52 w-auto rounded border" />
            </div>
          </section>

          {/* 2. Son İlanlar */}
          <section>
            
          </section>
        </div>
      );
    }
  }
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <HeroSection />

<div className="flex flex-row items-center justify-between p-5">
              <h2 className="text-3xl font-bold text-gray-800">Son İlanlar</h2>
              <Link to={'/ilanlar'} className="flex flex-row items-center justify-center text-xl font-bold hover:text-blue-600">
                Tüm İlanlar <span><ChevronRight /></span>
              </Link>
            </div>      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;