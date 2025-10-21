// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
// İkonları import edelim
import { ChevronRight, FileText, Bookmark } from 'lucide-react'; 
import apiClient from '../api/axiosConfig';

// Not: samplePost'u sildim, API'den gelen veriyi kullanıyoruz.

function HomePage() {
  const { isAuthenticated, user } = useAuth();
  
  // Veri state'lerini ayıralım
  const [recentPosts, setRecentPosts] = useState([]);
  const [myPostsSummary, setMyPostsSummary] = useState([]);
  const [savedPostsSummary, setSavedPostsSummary] = useState([]);

  // Yükleme state'lerini ayıralım
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingAuthData, setLoadingAuthData] = useState(true); // Sadece giriş yapmışsa kullanılır
  
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Herkes için son ilanları çek
    const fetchRecentPosts = async () => {
      setLoadingRecent(true);
      try {
        // API'den sadece 3 tane istediğimizi belirtelim (veya slice(0,3) devam)
        const response = await apiClient.get('/posts?limit=3'); 
        setRecentPosts(response.data.posts); 
      } catch (err) {
        console.error("Son ilanlar çekilirken hata:", err);
        setError('Son ilanlar yüklenirken bir sorun oluştu.');
      } finally {
        setLoadingRecent(false);
      }
    };

    // 2. Sadece giriş yapmış kullanıcılar için ek verileri çek
    const fetchAuthData = async () => {
      if (!isAuthenticated) {
        setLoadingAuthData(false); // Giriş yapmamışsa yükleme bitti sayılır
        return;
      }
      
      setLoadingAuthData(true);
      try {
        // İki isteği aynı anda atalım
        const [myPostsRes, savedPostsRes] = await Promise.all([
          apiClient.get('/posts/my-posts?limit=2'), // Panel için özet, 2 tane yeter
          apiClient.get('/posts/saved?limit=2')     // Kaydedilenler özeti, 2 tane (Varsayımsal endpoint)
        ]);
        
        setMyPostsSummary(myPostsRes.data);
        setSavedPostsSummary(savedPostsRes.data);

      } catch (err) {
        console.warn("Kullanıcı özet verileri çekilirken hata:", err);
        // Bu kritik bir hata değil, sadece özet alanları boş görünür.
        // O yüzden setError(null) yapmıyoruz.
      } finally {
        setLoadingAuthData(false);
      }
    };

    fetchRecentPosts();
    fetchAuthData();
    
    // isAuthenticated değiştiğinde (login/logout) bu effect yeniden çalışsın
  }, [isAuthenticated]);


  const HeroSection = () => {
    if (isAuthenticated) {
      return (
        // Giriş yapmış kullanıcının Hero'sunu biraz daha zenginleştirebiliriz.
        <div className="text-center bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Tekrar hoş geldin, {user.name}!</h1>
          <p className="mt-3 text-lg text-gray-600">
            Kayıp dostlarımızı bulmaya yardım etmeye hazır mısın?
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/ilan-ver"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Yeni İlan Ver
            </Link>
            <Link
              to="/panelim" 
              className="px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
            >
              Panelim
            </Link>
          </div>
        </div>
      );
    } else {
      // --- ZİYARETÇİ GÖRÜNÜMÜ - DOKUNULMADI ---
      return (
        <div className="space-y-12">
          {/* 1. Hero Section: Karşılama Alanı */}
          <section className="flex flex-col items-center justify-center text-center  p-4   space-y-4  max-w-4xl">
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
        </div>
      );
    }
  }

  // Helper component (İlan yoksa gösterilecek boş kart)
  const EmptyAuthSection = ({ title, text, icon }) => (
    <div className="text-center bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {icon}
      <p className="text-md text-gray-700 font-medium mt-2">{title}</p>
      <p className="text-gray-500 text-sm mt-1">{text}</p>
    </div>
  );


  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <HeroSection />

      {/* ===========================================
        === KULLANICIYA ÖZEL BÖLÜMLER (SADECE AUTH) ===
        ===========================================
      */}
      {isAuthenticated && (
        <div className="mb-12 space-y-12">
          {loadingAuthData ? (
            <Spinner />
          ) : (
            <>
              {/* --- Aktif İlanlarım Özeti --- */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Aktif İlanlarım</h2>
                  <Link to="/panelim" className="flex items-center text-blue-600 hover:underline font-medium">
                    Tümünü Yönet <ChevronRight size={20} />
                  </Link>
                </div>
                {myPostsSummary.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myPostsSummary.map(post => <PostCard key={post.id} post={post} />)}
                  </div>
                ) : (
                  <EmptyAuthSection
                    title="Aktif İlanın Yok"
                    text="Yeni bir kayıp/bulundu ilanı vererek başlayabilirsin."
                    icon={<FileText size={32} className="mx-auto text-gray-400" />}
                  />
                )}
              </section>

              {/* --- Kaydedilen İlanlar Özeti --- */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Kaydedilen İlanlar</h2>
                  <Link to="/kaydedilenler" className="flex items-center text-blue-600 hover:underline font-medium">
                    Tümünü Gör <ChevronRight size={20} />
                  </Link>
                </div>
                {savedPostsSummary.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedPostsSummary.map(post => <PostCard key={post.id} post={post} />)}
                  </div>
                ) : (
                   <EmptyAuthSection
                    title="Kaydedilen İlanın Yok"
                    text="İlgini çeken ilanları kaydederek buradan takip edebilirsin."
                    icon={<Bookmark size={32} className="mx-auto text-gray-400" />}
                  />
                )}
              </section>
            </>
          )}
        </div>
      )}
      {/* === KULLANICIYA ÖZEL BÖLÜMLER SONU === */}


      {/* =====================================
        === GENEL BÖLÜM (HERKES GÖRÜR) ===
        =====================================
      */}
      <section>
        <div className="flex flex-row items-center justify-between p-5">
          <h2 className="text-3xl font-bold text-gray-800">Son İlanlar</h2>
          <Link to={'/ilanlar'} className="flex flex-row items-center justify-center text-xl font-bold hover:text-blue-600">
            Tüm İlanlar <span><ChevronRight /></span>
          </Link>
        </div>
        
        {loadingRecent ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Gösterilecek ilan bulunamadı.</p>
        )}
      </section>
    </div>
  );
}

export default HomePage;