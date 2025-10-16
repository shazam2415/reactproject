import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // AuthContext'i import ediyoruz
import PostCard from '../components/PostCard'; // Kendi PostCard component'in
import Spinner from '../components/Spinner';
import { ChevronRight } from 'lucide-react';

// Örnek ilan verileri (daha sonra Supabase'den gelecek)
const samplePosts = [
  {
    id: 1,
    status: 'Kayıp',
    name: 'Boncuk',
    city: 'İstanbul',
    district: 'Kadıköy',
    details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır',
    imageUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 2,
    status: 'Bulundu',
    name: 'Paşa',
    city: 'Ankara',
    district: 'Çankaya',
    details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır',
    imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fHx8MA%3D%3D',
  },
  {
    id: 3,
    status: 'Kayıp',
    name: 'Limon',
    city: 'İzmir',
    district: 'Bornova',
    details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır',
    imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: 4,
    status: 'Kayıp',
    name: 'Karabaş',
    city: 'İstanbul',
    district: 'Beşiktaş',
    details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır',
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D',
  },
];

function HomePage() {

  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        // Sadece ilk 6 ilanı çekmek için bir limit parametresi ekleyebiliriz (backend destekliyorsa)
        // Şimdilik tüm ilanları çekip frontend'de sınırlayalım.
        const response = await axios.get('http://localhost:3001/api/posts');
        setPosts(response.data.slice(0, 6)); // En son 6 ilanı al
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
        <div className="text-center bg-white p-8 border-2 shadow-xl mb-10">
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
            <div className="flex flex-row items-center justify-between p-5">
              <h2 className="text-3xl font-bold text-gray-800">Son İlanlar</h2>
              <Link to={'/ilanlar'} className="flex flex-row items-center justify-center text-xl font-bold hover:text-blue-600">
                Tüm İlanlar <span><ChevronRight /></span>
              </Link>
            </div>

            <div className="flex lg:flex-row flex-col items-center space-y-8 lg:space-y-0 justify-between">
              {samplePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>
      );
    }
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">En Son Eklenenler</h2>
      {loading ? (
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