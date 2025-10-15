import { Link } from 'react-router-dom';

// Bu sayfada olduğumuzu varsayacağımız tek bir ilan verisi.
// Normalde bu veri, URL'deki ID'ye göre Supabase'den çekilecek.
const samplePost = {
  id: 1,
  status: 'Kayıp',
  name: 'Boncuk',
  type: 'Kedi',
  city: 'İstanbul',
  district: 'Kadıköy',
  date: '12 Ekim 2025',
  imageUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&auto=format&fit=crop',
  description: 'Boncuk, 1 yaşında, dişi bir tekir kedidir. En son dün akşam Moda sahilinde görüldü. Boynunda kırmızı bir tasması vardı. Çok uysaldır ama yabancılardan biraz korkar. Lütfen gören olursa iletişime geçsin.',
  contact: {
    name: 'Ayşe Yılmaz',
    phone: '0555 123 45 67',
  }
};

function PostDetailPage() {
  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Sol Taraf: Fotoğraf */}
        <div>
          <img 
            src={samplePost.imageUrl} 
            alt={samplePost.name}
            className="w-full h-auto rounded-lg object-cover aspect-square"
          />
        </div>

        {/* Sağ Taraf: Detaylar */}
        <div className="flex flex-col space-y-4">
          {/* Durum Etiketi ve İsim */}
          <div>
            <span 
              className={`inline-block px-4 py-1.5 text-sm font-semibold text-white rounded-full
                ${samplePost.status === 'Kayıp' ? 'bg-red-500' : 'bg-green-500'}
              `}
            >
              {samplePost.status}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-3">{samplePost.name}</h1>
            <p className="text-lg text-gray-500">{samplePost.type}</p>
          </div>

          {/* Detay Bilgileri Listesi */}
          <div className="border-t border-b border-gray-200 py-4">
            <dl className="space-y-4">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-600">Konum:</dt>
                <dd className="text-gray-800 text-right">{samplePost.city}, {samplePost.district}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-600">Tarih:</dt>
                <dd className="text-gray-800 text-right">{samplePost.date}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-600">İlan Sahibi:</dt>
                <dd className="text-gray-800 text-right">{samplePost.contact.name}</dd>
              </div>
            </dl>
          </div>

          {/* Açıklama */}
          <div>
            <h2 className="text-xl font-bold text-gray-800">Açıklama</h2>
            <p className="mt-2 text-gray-700 leading-relaxed">
              {samplePost.description}
            </p>
          </div>
          
          {/* İletişim Butonu */}
          <div className="pt-4">
            <a 
              href={`tel:${samplePost.contact.phone}`}
              className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              İletişime Geç ({samplePost.contact.phone})
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;