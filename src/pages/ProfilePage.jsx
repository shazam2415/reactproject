import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext'; // Context importu
import apiClient from '../api/axiosConfig';
import { toast } from 'react-toastify';
import {
  FaUserEdit,
  FaSave,
  FaTimes,
  FaKey,
  FaExclamationTriangle,
  FaUserCircle,
  FaCamera,
  FaSpinner,
  FaTrashAlt,
} from 'react-icons/fa';

function ProfilePage() {
  // YENİ: 'updateUser' fonksiyonu AuthContext'ten alındı
  const { user, token, updateUser } = useAuth();

  // Bilgi düzenleme formu için state'ler
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [infoData, setInfoData] = useState({ name: user?.name || '', email: user?.email || '' });

  // Şifre değiştirme formu için state'ler
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const [removeLoading, setRemoveLoading] = useState(false);

  // Profil resmi için state'ler
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [infoLoading, setInfoLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // ... (handleInfoChange ve handlePasswordChange aynı kaldı) ...
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfoData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Resim seçme işlemini yönetir
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // 5MB limit kontrolü (isteğe bağlı)
      if (file.size > 5 * 1024 * 1024) { 
        toast.error('Dosya boyutu çok büyük (Max 5MB).');
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast.error('Lütfen geçerli bir resim dosyası seçin.');
      setProfileImage(null);
      setImagePreview(null);
    }
  };

  // Resim yükleme işlemini gönderir (GÜNCELLENDİ)
  const handleImageSubmit = async () => {
    if (!profileImage) return;

    setImageLoading(true);
    const formData = new FormData();
    formData.append('profilePicture', profileImage); 

    try {
      // === GERÇEK API ÇAĞRISI ===
      // Yorum satırlarını kaldırdık ve backend'deki doğru yolu yazdık.
      // apiClient (axiosConfig.js) token'ı otomatik eklemelidir.
      const response = await apiClient.post('/users/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Backend'den dönen kalıcı URL'yi al
      // (userRoutes.js'de bu yanıtı { avatarUrl: ... } olarak ayarlamıştık)
      const newAvatarUrl = response.data.avatarUrl; 
      
      // === SİMÜLASYON KALDIRILDI ===
      // const simulatedNewAvatarUrl = imagePreview; 
      
      // AuthContext'i (ve localStorage'ı) backend'den gelen
      // GERÇEK, KALICI URL ile güncelle
      updateUser({
        ...user,
        avatarUrl: newAvatarUrl 
      });
      // =================================

      toast.success('Profil resmi güncellendi!');

      // Formu temizle
      setImagePreview(null);
      setProfileImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

    } catch (error) {
      // Backend'den gelen hata mesajını kullanıcıya göster
      const errorMessage = error.response?.data?.message || 'Resim yüklenirken bir hata oluştu.';
      toast.error(errorMessage);
      console.error('Resim yükleme hatası:', error.response || error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleImageRemove = async () => {
    // Kullanıcıya onaylatma
    if (!window.confirm('Profil resminizi kalıcı olarak kaldırmak istediğinizden emin misiniz?')) {
      return;
    }

    setRemoveLoading(true);
    try {
      // 1. Backend'deki yeni DELETE endpoint'ini çağır
      // DİKKAT: /api/api hatası almamak için /api/ olmadan yazıyoruz
      const response = await apiClient.delete('/users/remove-avatar');
      
      // 2. Backend'den dönen 'null' URL'yi al
      const newAvatarUrl = response.data.avatarUrl; // Bu null olmalı

      // 3. AuthContext'i güncelle
      updateUser({
        ...user,
        avatarUrl: newAvatarUrl // (null)
      });

      toast.success('Profil resmi kaldırıldı.');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Resim kaldırılırken bir hata oluştu.';
      toast.error(errorMessage);
      console.error('Resim kaldırma hatası:', error.response || error);
    } finally {
      setRemoveLoading(false);
    }
  };

  // Bilgi güncelleme formunu gönderir (GÜNCELLENDİ)
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setInfoLoading(true);
    
    try {
      // GELECEKTEKİ ADIM: Backend'de /api/users/profile gibi bir endpoint oluşturulacak
      // await apiClient.put('/users/profile', infoData);
      
      console.log('Profil güncellenecek veri:', infoData);

      // === YENİ EKLEME ===
      // AuthContext'i ve localStorage'ı yeni bilgilerle güncelle
      updateUser({
        ...user,
        name: infoData.name,
        email: infoData.email
      });
      // ===================
      
      toast.success('Profil bilgileri güncellendi!');
      setIsEditingInfo(false);

    } catch (error) {
       toast.error('Bilgiler güncellenirken bir hata oluştu.');
       console.error(error);
    } finally {
        setInfoLoading(false);
    }
  };

  // Şifre değiştirme formunu gönderir
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor!');
      return;
    }
    setPasswordLoading(true);
    // ... (mevcut kod)
    console.log('Şifre değiştirme verisi:', passwordData);
    toast.success('Şifre başarıyla değiştirildi!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordLoading(false);
  };

  return (
    <div className="flex flex-col w-full max-w-4xl py-10 space-y-10">

      {/* === PROFİL BİLGİLERİ KARTI === */}
      <div className="bg-white p-4 sm:p-6 w-full shadow-md">
        {/* ... (Başlık ve Düzenle butonu - Değişiklik yok) ... */}
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

        {/* === Profil Resmi Alanı === */}
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8">

          {/* Avatar Gösterimi (GÜNCELLENDİ - Mantık aynı ama context'ten besleniyor) */}
          <div className="relative w-32 h-32 flex-shrink-0">
            {imagePreview ? (
              // 1. Öncelik: Yeni seçilen resim (önizleme)
              <img src={imagePreview} alt="Profil Önizleme" className="w-full h-full rounded-full object-cover border-4 border-gray-200" />
            ) : user?.avatarUrl ? ( 
              // 2. Öncelik: Context'ten gelen (artık güncel) resim
              <img src={user.avatarUrl} alt="Profil" className="w-full h-full rounded-full object-cover border-4 border-gray-200" />
            ) : (
              // 3. Varsayılan ikon
              <FaUserCircle className="w-full h-full text-gray-300" />
            )}

            {/* ... (Resmi değiştir butonu ve gizli input - Değişiklik yok) ... */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={imageLoading || removeLoading} // Silme sırasında da pasif et
              className="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-all shadow-md disabled:bg-gray-400"
              title="Resmi değiştir"
            >
              <FaCamera />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />
          </div>

          {/* ... (Resim Yükleme Kontrolleri - Değişiklik yok) ... */}
           <div className="flex flex-col items-center sm:items-start mt-2">
            {imagePreview ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleImageSubmit}
                  disabled={imageLoading}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 disabled:bg-gray-400"
                >
                  {imageLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  <span>{imageLoading ? 'Yükleniyor...' : 'Resmi Kaydet'}</span>
                </button>
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setProfileImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = null;
                  }}
                  disabled={imageLoading}
                  className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6"
                >
                  <FaTimes /> İptal
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 items-center sm:items-start">
                <p className="text-gray-500 text-sm text-center sm:text-left">
                  Yeni bir resim yüklemek için <br className="hidden sm:block" /> kamera ikonuna tıklayın.
                  <br /> (Max 5MB, JPG/PNG)
                </p>
                {/* Bu "Resmi Kaldır" butonu artık <p> ile kardeş değil, div içinde */}
                {user?.avatarUrl && (
                    <button
                      onClick={handleImageRemove}
                      disabled={removeLoading}
                      className="flex items-center justify-center gap-2 text-sm text-red-600 hover:text-red-800 disabled:text-gray-400 font-medium"
                    >
                      {removeLoading ? <FaSpinner className="animate-spin" /> : <FaTrashAlt />}
                      {removeLoading ? 'Kaldırılıyor...' : 'Resmi Kaldır'}
                    </button>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* === Bilgi Düzenleme Formu === */}
        {!isEditingInfo ? (
          <div className="space-y-4">
            {/* GÜNCELLENDİ: Artık context'teki 'user'dan anlık veri okunuyor */}
            <div><label className="text-sm font-medium text-gray-500">Ad Soyad</label><p className="text-lg text-gray-900">{user?.name}</p></div>
            <div><label className="text-sm font-medium text-gray-500">E-posta</label><p className="text-lg text-gray-900">{user?.email}</p></div>
          </div>
        ) : (
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            {/* ... (Form inputları - Değişiklik yok) ... */}
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
      {/* ... (Değişiklik yok) ... */}
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
      {/* ... (Değişiklik yok) ... */}
      <div className=" bg-red-50 border-4 border-red-500 p-6">
        <h2 className="text-xl font-bold text-red-800 mb-2 flex items-center gap-3"><FaExclamationTriangle /> Tehlikeli Alan</h2>
        <p className="text-red-700 mb-4">Bu alandaki işlemler geri alınamaz. Lütfen dikkatli olun.</p>
        <button className="border-4 border-red-800 bg-white hover:bg-red-700 hover:text-white text-red-800 font-bold py-2 px-4">Hesabımı Sil</button>
      </div>

    </div>
  );
}

export default ProfilePage;