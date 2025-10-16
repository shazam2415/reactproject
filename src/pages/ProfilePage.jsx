import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaRegNewspaper, FaExclamationTriangle } from 'react-icons/fa';

// --- GERÇEK VERİ İÇİN NOT ---
// Normalde bu veriler bir API'den veya state management (Context, Redux) aracılığıyla gelir.
// Bu örnek için statik bir obje kullanıyoruz.
const mockUser = {
  name: 'İsa Demir',
  email: 'isa.demir@example.com',
  avatarUrl: 'https://via.placeholder.com/150', // veya default bir avatar yolu
  joinDate: '15 Ekim 2025',
};

// Kullanıcının ilanlarını temsil eden mock data
const userPosts = [
  { id: 1, title: 'Beşiktaşta kaybolan Tekir kedim', city: 'İstanbul' },
  { id: 2, title: 'Ankara Bahçelievlerde bulunan Golden Retriever', city: 'Ankara' },
];
// ---------------------------------

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Burada API'ye güncelleme isteği gönderilir.
    console.log('Güncellenen veri:', formData);
    // Başarılı olursa mockUser'ı da güncelleyip edit modundan çıkabiliriz.
    // mockUser.name = formData.name; ...
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      
      {/* Sayfa Başlığı ve Düzenle Butonu */}
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

      {/* Profil Bilgileri Kartı */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-8">
          
          {/* Avatar */}
          <div className="flex-shrink-0 mb-6 sm:mb-0">
            <img 
              src={mockUser.avatarUrl} 
              alt="Profil Fotoğrafı" 
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          {/* Bilgiler veya Düzenleme Formu */}
          <div className="w-full">
            {!isEditing ? (
              // --- GÖRÜNTÜLEME MODU ---
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tam Adınız</label>
                  <p className="text-lg text-gray-900">{formData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">E-posta Adresi</label>
                  <p className="text-lg text-gray-900">{formData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Katılım Tarihi</label>
                  <p className="text-lg text-gray-900">{mockUser.joinDate}</p>
                </div>
              </div>
            ) : (
              // --- DÜZENLEME MODU ---
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tam Adınız</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta Adresi</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
        </div>
      </div>

      {/* İlanlarım Bölümü */}
      <div className="mt-10 bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
          <FaRegNewspaper />
          <span>İlanlarım</span>
        </h2>
        <div className="space-y-3">
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <Link to={`/ilanlar/${post.id}`} key={post.id} className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                <p className="font-semibold text-blue-700">{post.title}</p>
                <p className="text-sm text-gray-600">{post.city}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">Henüz hiç ilan oluşturmadınız.</p>
          )}
        </div>
      </div>

      {/* Tehlike Bölgesi */}
      <div className="mt-10 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
        <h2 className="text-xl font-bold text-red-800 mb-2 flex items-center gap-3">
          <FaExclamationTriangle />
          <span>Tehlikeli Alan</span>
        </h2>
        <p className="text-red-700 mb-4">
          Bu alandaki işlemler geri alınamaz. Lütfen dikkatli olun.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
          Hesabımı Sil
        </button>
      </div>

    </div>
  );
}

export default ProfilePage;