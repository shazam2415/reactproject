// src/pages/ProfilePage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/axiosConfig';
import { toast } from 'react-toastify';
import { FaUserEdit, FaSave, FaTimes, FaKey, FaExclamationTriangle } from 'react-icons/fa';

function ProfilePage() {
  const { user, token } = useAuth(); // AuthContext'ten mevcut kullanıcıyı al
  
  // Bilgi düzenleme formu için state'ler
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [infoData, setInfoData] = useState({ name: user?.name || '', email: user?.email || '' });
  
  // Şifre değiştirme formu için state'ler
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  
  const [infoLoading, setInfoLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Bilgi formu input'larını günceller
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfoData(prev => ({ ...prev, [name]: value }));
  };
  
  // Şifre formu input'larını günceller
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Bilgi güncelleme formunu gönderir
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setInfoLoading(true);
    // GELECEKTEKİ ADIM: Backend'de /api/users/profile gibi bir endpoint oluşturulacak
    // await apiClient.put('/users/profile', infoData);
    console.log('Profil güncellenecek veri:', infoData);
    toast.success('Profil bilgileri güncellendi!'); // Şimdilik anında başarılı varsayıyoruz
    setIsEditingInfo(false);
    setInfoLoading(false);
  };
  
  // Şifre değiştirme formunu gönderir
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor!');
      return;
    }
    setPasswordLoading(true);
    // GELECEKTEKİ ADIM: Backend'de /api/users/change-password gibi bir endpoint oluşturulacak
    // await apiClient.put('/users/change-password', { oldPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
    console.log('Şifre değiştirme verisi:', passwordData);
    toast.success('Şifre başarıyla değiştirildi!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }); // Formu temizle
    setPasswordLoading(false);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-10">
      
      {/* === PROFİL BİLGİLERİ KARTI === */}
      <div className="bg-white p-6 sm:p-8 shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Kişisel Bilgiler</h2>
            <p className="text-gray-500">Profil bilgilerinizi buradan görüntüleyin ve düzenleyin.</p>
          </div>
          {!isEditingInfo && (
            <button
              onClick={() => setIsEditingInfo(true)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 transition-colors"
            >
              <FaUserEdit /> <span className="hidden sm:inline">Düzenle</span>
            </button>
          )}
        </div>
        
        {!isEditingInfo ? (
          <div className="space-y-4">
            <div><label className="text-sm font-medium text-gray-500">Ad Soyad</label><p className="text-lg text-gray-900">{user?.name}</p></div>
            <div><label className="text-sm font-medium text-gray-500">E-posta</label><p className="text-lg text-gray-900">{user?.email}</p></div>
          </div>
        ) : (
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Ad Soyad</label><input type="text" id="name" name="name" value={infoData.name} onChange={handleInfoChange} className="mt-1 w-full form-input" required /></div>
            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta</label><input type="email" id="email" name="email" value={infoData.email} onChange={handleInfoChange} className="mt-1 w-full form-input" required /></div>
            <div className="flex gap-4 pt-2">
              <button type="submit" disabled={infoLoading} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 disabled:bg-gray-400"><FaSave /> {infoLoading ? 'Kaydediliyor...':'Kaydet'}</button>
              <button type="button" onClick={() => setIsEditingInfo(false)} className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6"><FaTimes /> İptal</button>
            </div>
          </form>
        )}
      </div>

      {/* === ŞİFRE DEĞİŞTİRME KARTI === */}
      <div className="bg-white p-6 sm:p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3"><FaKey /> Güvenlik</h2>
        <p className="text-gray-500 mb-6">Şifrenizi buradan değiştirebilirsiniz.</p>
        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div><label htmlFor="currentPassword">Mevcut Şifre</label><input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="mt-1 w-full form-input" required /></div>
          <div><label htmlFor="newPassword">Yeni Şifre</label><input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="mt-1 w-full form-input" required /></div>
          <div><label htmlFor="confirmPassword">Yeni Şifre Tekrar</label><input type="password" id="confirmPassword" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="mt-1 w-full form-input " required /></div>
          <div className="pt-2">
            <button type="submit" disabled={passwordLoading} className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 disabled:bg-gray-400">{passwordLoading ? 'Değiştiriliyor...':'Şifreyi Değiştir'}</button>
          </div>
        </form>
      </div>
      
      {/* === TEHLİKELİ ALAN KARTI === */}
      <div className="mt-10 bg-red-50 border-4 border-red-500 p-6">
        <h2 className="text-xl font-bold text-red-800 mb-2 flex items-center gap-3"><FaExclamationTriangle /> Tehlikeli Alan</h2>
        <p className="text-red-700 mb-4">Bu alandaki işlemler geri alınamaz. Lütfen dikkatli olun.</p>
        <button className="border-4 border-red-800 bg-white hover:bg-red-700 hover:text-white text-red-800 font-bold py-2 px-4">Hesabımı Sil</button>
      </div>

    </div>
  );
}

// CSS'i basitleştirmek için Tailwind Forms eklentisini veya global bir stil ekleyebiliriz.
// Şimdilik input'lara ortak bir stil vermek için index.css'e şunu ekleyebilirsin:
// 
export default ProfilePage;