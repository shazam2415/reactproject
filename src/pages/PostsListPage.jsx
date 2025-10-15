// src/pages/PostsListPage.jsx
import PostCard from '../components/PostCard';
import SearchFilter from '../components/SearchFilter';

// Şimdilik aynı sahte verileri kullanalım. 
// Gerçekte burada daha fazla veri olacak (örneğin 20-30 tane).
const samplePosts = [
  { id: 1, details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır', status: 'Kayıp', name: 'Boncuk', city: 'İstanbul', district: 'Kadıköy', imageUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&auto=format&fit=crop' },
  { id: 2, details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır', status: 'Bulundu', name: 'Paşa', city: 'Ankara', district: 'Çankaya', imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop' },
  { id: 3, details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır', status: 'Kayıp', name: 'Limon', city: 'İzmir', district: 'Bornova', imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
  { id: 4, details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır', status: 'Kayıp', name: 'Karabaş', city: 'İstanbul', district: 'Beşiktaş', imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=500&auto=format&fit=crop' },
  { id: 5, details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır', status: 'Bulundu', name: 'Pamuk', city: 'Bursa', district: 'Nilüfer', imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e6984100d?w=500&auto=format&fit=crop' },
  { id: 6, details: 'merhaba bu metin örnek ayrıntı metnidir, bunun yerine kullanıcıların gerçek olarak yazacağı metinler olacaktır', status: 'Kayıp', name: 'Duman', city: 'Antalya', district: 'Muratpaşa', imageUrl: 'https://images.unsplash.com/photo-1577023311546-cdc08a8ef55d?w=500&auto=format&fit=crop' },
];

function PostsListPage() {
  return (
    <div className="space-y-8">
      {/* Sayfa Başlığı */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Tüm İlanlar</h1>
        <p className="mt-2 text-lg text-gray-600">Aradığınız dostumuzu bulmak için ilanları filtreleyin.</p>
      </div>

      {/* Arama ve Filtreleme Bileşeni */}
      <SearchFilter />
      
      {/* İlanların Listelendiği Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {samplePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* İleride buraya "Daha Fazla Yükle" veya sayfalama (pagination) eklenebilir */}
    </div>
  );
}

export default PostsListPage;