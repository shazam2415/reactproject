// src/pages/CreatePostPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm'; // PostForm component'ini import et

const EMPTY_POST = {};

function CreatePostPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuth();
  const navigate = useNavigate();

  // Bu fonksiyon PostForm component'inden çağrılacak
  const handleCreatePost = async (postData) => {
    setError(null);
    setLoading(true);

    if (!token) {
      setError('İlan oluşturmak için giriş yapmalısınız.');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await apiClient.post('/posts', postData);
      navigate(`/ilanlar/${response.data.id}`);

    } catch (err) {
      console.error('İlan oluşturulurken hata oluştu:', err);
      const errorMessage = err.response?.data?.error || 'İlan oluşturulamadı. Lütfen tekrar deneyin.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-h-screen mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Yeni İlan Oluştur</h1>
      <div className="bg-white p-8 shadow-xl">
        <PostForm
          initialData={EMPTY_POST}
          onSubmit={handleCreatePost}
          isLoading={loading}
          submitButtonText="İlanı Yayınla"
        />
        {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default CreatePostPage;