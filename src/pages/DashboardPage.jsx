import { Link } from 'react-router-dom';

// Sadece bu kullanıcıya ait olduğunu varsaydığımız birkaç ilan.
const sampleUserPosts = [
  { id: 1, status: 'Kayıp', name: 'Boncuk', city: 'İstanbul', district: 'Kadıköy', imageUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=100&h=100&fit=crop' },
  { id: 4, status: 'Kayıp', name: 'Karabaş', city: 'İstanbul', district: 'Beşiktaş', imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=100&h=100&fit=crop' },
  { id: 5, status: 'Bulundu', name: 'Pamuk', city: 'Bursa', district: 'Nilüfer', imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e6984100d?w=100&h=100&fit=crop' },
];


function DashboardPage() {
  return (
    <div className="w-full">
      {/* Sayfa Başlığı ve Yeni İlan Butonu */}
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Panelim</h1>
          <p className="mt-1 text-md text-gray-500">
            Yayınladığınız ilanları buradan yönetebilirsiniz.
          </p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            to="/ilan-ver"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Yeni İlan Oluştur
          </Link>
        </div>
      </div>
      
      {/* İlan Listesi */}
      <div className="space-y-4">
        {sampleUserPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            {/* Sol Taraf: İlan Bilgisi */}
            <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
              <img src={post.imageUrl} alt={post.name} className="w-16 h-16 rounded-md object-cover mr-4" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{post.name}</h3>
                <p className="text-sm text-gray-600">{post.city}, {post.district}</p>
                <span 
                  className={`mt-1 inline-block px-2 py-0.5 text-xs font-semibold text-white rounded-full
                    ${post.status === 'Kayıp' ? 'bg-red-500' : 'bg-green-500'}
                  `}
                >
                  {post.status}
                </span>
              </div>
            </div>

            {/* Sağ Taraf: İşlem Butonları */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <Link
                to={`/ilan/${post.id}/duzenle`}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Düzenle
              </Link>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
        
        {/* İlan Yoksa Gösterilecek Mesaj (şimdilik yorumda) */}
        {/* {sampleUserPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Henüz hiç ilan yayınlamadınız.</p>
          </div>
        )}
        */}
      </div>
    </div>
  );
}

export default DashboardPage;