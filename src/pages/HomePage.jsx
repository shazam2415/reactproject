// src/pages/HomePage.jsx

import { ChevronLeft, ChevronRight } from "lucide-react";
import PostCard from "../components/PostCard";
import { Link } from 'react-router-dom';

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
  return (
    <div className="space-y-12">
      {/* 1. Hero Section: Karşılama Alanı */}
      <section className="flex flex-col items-center justify-center text-center  p-4 rounded-lg  space-y-4  max-w-[1200px]">
        <h1 className="lg:text-5xl text-2xl font-extrabold text-gray-800">
          Kayıp Dostlarımızı <span className="font-bold text-blue-600">Evine Dön</span>dürelim
        </h1>
        <div className="flex lg:flex-row flex-col items-center justify-between lg:space-y-0 space-y-4 p-2 lg:space-x-2 w-full">
        <p className="text-sm lg:text-xl text-gray-600 w-full p-1">
          <span className="font-bold text-blue-600">Evine Dön</span>, kaybolan evcil hayvanlarınızı bulmanıza veya bulduğunuz sahipsiz dostlarımızı yuvalarına kavuşturmanıza yardımcı olan bir topluluk platformudur.
        </p>
        <img src="/exotic-pet-home.jpg" alt="" className="lg:h-64 h-32 w-auto rounded border" />
        </div>
      </section>

      {/* 2. Son İlanlar */}
      <section>
        <div className="flex flex-row items-center justify-between pb-5">
        <h2 className="text-3xl font-bold text-gray-800">Son İlanlar</h2>
        <Link to={'/ilanlar'} className="flex flex-row items-center justify-center text-xl font-bold hover:text-blue-600">
        Tüm İlanlar <span><ChevronRight/></span>
        </Link>
        </div>
        
        <div className="flex lg:flex-row flex-col justify-between">
          {samplePosts.map((post) => (
            <PostCard key={post.id} post={post}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;