import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig.js';import Spinner from '../components/Spinner'; // Yükleniyor ikonu component'in
import { useAuth } from '../context/AuthContext'; // YENİ: AuthContext'i import et
import { FaUserCircle, FaMapMarkerAlt, FaInfoCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

// YENİ: SweetAlert2'yi ve CSS'ini import et
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function PostDetailPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Adım: URL'den 'ilanId' parametresini al
  const { ilanId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // 2. Adım: Backend'den veriyi çek
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/posts/${ilanId}`);
        setPost(response.data);
      } catch (err) {
        console.error("İlan detayı çekilirken hata:", err);
        const errorMessage = err.response?.status === 404
          ? 'Bu ilan bulunamadı veya kaldırılmış.'
          : 'Veri yüklenirken bir sorun oluştu.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [ilanId]); // ilanId değiştiğinde (farklı bir ilana geçildiğinde) tekrar veri çek

  // Yüklenme durumu
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-xl">{error}</p>
        <Link to="/ilanlar" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Tüm İlanlara Göz At
        </Link>
      </div>
    );
  }

  const isOwner = user && user.id === post.user_id;

  const handleDelete = () => {
    // İşte sihir burada başlıyor. window.confirm yerine Swal.fire() kullanıyoruz.
    Swal.fire({
      title: 'Emin misiniz?',
      text: "Bu ilanı silmek üzeresiniz. Bu işlem geri alınamaz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'İptal'
    }).then(async (result) => {
      // Kullanıcı "Evet, sil!" butonuna basarsa...
      if (result.isConfirmed) {
        const toastId = toast.loading("İlan siliniyor...");
        try {
          await apiClient.delete(`/posts/${ilanId}`);
          toast.update(toastId, { 
            render: "İlan başarıyla silindi!", 
            type: "success", 
            isLoading: false, 
            autoClose: 2000 
          });
          setTimeout(() => {
            navigate('/panelim');
          }, 2000);
        } catch (err) {
          console.error("İlan silinirken hata:", err);
          toast.update(toastId, { 
            render: "İlan silinirken bir hata oluştu.", 
            type: "error", 
            isLoading: false, 
            autoClose: 3000 
          });
        }
      }
    });
  };

  const imageUrl = post.image_url 
    ? `http://localhost:3001/${post.image_url}` 
    : '/default.png';

  // Başarılı veri çekme durumu
  return (
    <div className="container min-h-screen mx-auto max-w-4xl px-4 py-8">
      <div className="bg-white shadow-xl overflow-hidden">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={post.title} 
            className="w-full h-96 object-cover"
          />
        )}
        
        <div className="p-6 md:p-8">
          <p className={`capitalize font-semibold text-sm ${post.status === 'kayip' ? 'text-red-600' : 'text-green-600'}`}>
            {post.status}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">{post.title}</h1>
          
          <div className="flex items-center text-gray-500 mt-4 space-x-4 text-md">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>{post.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserCircle />
              <span>İlan Sahibi: {post.author_name}</span>
            </div>
          </div>

          <hr className="my-6" />

          <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FaInfoCircle />
            Açıklama
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {post.description || "Bu ilan için bir açıklama girilmemiş."}
          </p>

          {/* İleride eklenecek "Düzenle" ve "Sil" butonları için alan */}
          {isOwner && (
            <div className="mt-8 flex justify-end gap-4">
              <Link
                to={`/ilanlar/${ilanId}/duzenle`} // DÜZENLEME SAYFASININ YOLU
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                <FaEdit /> Düzenle
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                <FaTrash /> Sil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;