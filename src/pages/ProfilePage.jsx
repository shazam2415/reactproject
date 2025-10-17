// src/pages/ProfilePage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserEdit } from 'react-icons/fa';

function ProfilePage() {
  const { user, token } = useAuth(); // Düzenleme için token gerekebilir
  
  // Düzenleme modu için state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // --- GELECEKTEKİ ADIM ---
    // Burada apiClient.put('/users/profile', formData) gibi bir istek atılacak.
    // Şimdilik sadece düzenleme modunu kapatalım.
    console.log('Profil güncellenecek veri:', formData);
    setIsEditing(false);
    // Gerçek istek sonrası: toast.success('Profil başarıyla güncellendi!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Profilim</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            <FaUserEdit />
            <span>Profili Düzenle</span>
          </button>
        )}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        {!isEditing ? (
          // --- GÖRÜNTÜLEME MODU ---
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Ad Soyad</label>
              <p className="text-lg text-gray-900">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">E-posta Adresi</label>
              <p className="text-lg text-gray-900">{user?.email}</p>
            </div>
          </div>
        ) : (
          // --- DÜZENLEME MODU ---
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ad Soyad</label>
              <input
                type="text" id="name" name="name" value={formData.name} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
              <input
                type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-4 pt-2">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md">Kaydet</button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-md">İptal</button>
            </div>
          </form>
        )}
      </div>

      {/* İleride şifre değiştirme, hesap silme gibi alanlar buraya eklenebilir */}
    </div>
  );
}

export default ProfilePage;