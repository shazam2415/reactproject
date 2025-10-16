import React from 'react';
import { Link } from 'react-router-dom'; // YENİ: Link component'ini import et
import { FaMapMarkerAlt } from 'react-icons/fa';

// Component, 'post' adında bir prop alıyor
function PostCard({ post }) {
  // Varsayılan bir resim URL'si, eğer ilanın kendi resmi yoksa kullanılır
  const defaultImageUrl = '/default.png'; // Bu dosyayı public klasörüne koymalısın

  const imageUrl = post.image_url ? `http://localhost:3001/${post.image_url}` : defaultImageUrl;

  return (
    // --- DEĞİŞİKLİK BURADA ---
    // Tüm kartı, ilanın detay sayfasına yönlendiren bir Link ile sarıyoruz
    <Link
      to={`/ilanlar/${post.id}`}
      className="block bg-white shadow-md border border-2 hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {post.status && (
          <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 text-white ${post.status === 'kayip' ? 'bg-red-500' : 'bg-green-500'}`}>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate" title={post.title}>
          {post.title}
        </h3>

        {/* author_name backend'den geliyorsa gösterilir */}
        {post.author_name && (
          <p className="text-sm text-gray-500 mt-1">
            İlan sahibi: {post.author_name}
          </p>
        )}

        <div className="flex items-center text-gray-600 mt-2 text-sm">
          <FaMapMarkerAlt className="mr-1" />
          <span>{post.city}</span>
        </div>
      </div>
    </Link>
    // -------------------------
  );
}

export default PostCard;