// src/pages/EditPostPage.jsx
import PostForm from '../components/PostForm';

// Düzenlediğimizi varsaydığımız sahte ilan verisi.
// Supabase'e geçince bu veri URL'deki ID'ye göre veritabanından gelecek.
const samplePostToEdit = {
  id: 1,
  status: 'Kayıp',
  name: 'Boncuk',
  type: 'Kedi',
  city: 'İstanbul',
  district: 'Kadıköy',
  description: 'Boncuk, 1 yaşında, dişi bir tekir kedidir. En son dün akşam Moda sahilinde görüldü. Boynunda kırmızı bir tasması vardı. Çok uysaldır ama yabancılardan biraz korkar. Lütfen gören olursa iletişime geçsin.',
};

function EditPostPage() {
  return (
    <div className="max-w-[1200px]">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            İlanı Düzenle
          </h1>
          <p className="mt-2 text-md text-gray-600">
            İlan bilgilerini güncelleyebilirsiniz.
          </p>
        </div>

        <div className="mt-8">
          {/* PostForm'u çağırıyoruz ve en önemlisi,
              mevcut ilan verisini 'existingPost' prop'u ile içeri gönderiyoruz. */}
          <PostForm existingPost={samplePostToEdit} />
        </div>
      </div>
    </div>
  );
}

export default EditPostPage;