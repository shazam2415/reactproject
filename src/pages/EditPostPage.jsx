import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';
import Spinner from '../components/Spinner';

function EditPostPage() {
  const { ilanId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // initialData: Formu doldurmak için backend'den çekilecek veri
  const [initialData, setInitialData] = useState(null);
  
  // İki aşamalı loading:
  // 1. pageLoading: Sayfa ilk açıldığında veriyi çekerken
  // 2. formLoading: Form gönderildiğinde
  const [pageLoading, setPageLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Adım: Mevcut ilan verisini çek
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await apiClient.get(`/posts/${ilanId}`);        const postData = response.data;

        // 2. Adım: Güvenlik Kontrolü - Bu ilanı düzenlemeye yetkisi var mı?
        if (!user || user.id !== postData.user_id) {
          setError('Bu ilanı düzenleme yetkiniz yok.');
          setPageLoading(false);
          // İsteğe bağlı: 3 saniye sonra ana sayfaya yönlendir
          setTimeout(() => navigate('/'), 3000); 
          return;
        }

        setInitialData(postData);
      } catch (err) {
        console.error("İlan verisi çekilirken hata:", err);
        setError('İlan bilgileri yüklenemedi.');
      } finally {
        setPageLoading(false);
      }
    };

    fetchPostData();
  }, [ilanId, user, navigate]);


  // 3. Adım: Form gönderildiğinde çalışacak fonksiyon
  const handleUpdatePost = async (postFormData) => {
    setError(null);
    setFormLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await apiClient.put(`/posts/${ilanId}`, postFormData);
      navigate(`/ilanlar/${ilanId}`);

    } catch (err) {
      console.error("İlan güncellenirken hata:", err);
      setError('İlan güncellenemedi. Lütfen tekrar deneyin.');
    } finally {
      setFormLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">İlanı Düzenle</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        {initialData && (
          <PostForm
            initialData={initialData}
            onSubmit={handleUpdatePost}
            isLoading={formLoading}
            submitButtonText="Değişiklikleri Kaydet"
          />
        )}
      </div>
    </div>
  );
}

export default EditPostPage;