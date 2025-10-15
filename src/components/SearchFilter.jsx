// src/components/SearchFilter.jsx

function SearchFilter() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        
        {/* Arama Kutusu */}
        <div className="md:col-span-2">
          <label htmlFor="search-keyword" className="block text-sm font-medium text-gray-700">Anahtar Kelime</label>
          <input 
            type="text" 
            id="search-keyword"
            placeholder="Şehir, ilçe veya isim ara..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          />
        </div>

        {/* Tür Filtresi */}
        <div>
          <label htmlFor="animal-type" className="block text-sm font-medium text-gray-700">Türü</label>
          <select id="animal-type" className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>Tümü</option>
            <option>Kedi</option>
            <option>Köpek</option>
            <option>Kuş</option>
            <option>Diğer</option>
          </select>
        </div>

        {/* Durum Filtresi */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Durum</label>
          <select id="status" className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>Tümü</option>
            <option>Kayıp</option>
            <option>Bulundu</option>
          </select>
        </div>

        {/* Buton */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-10">
          Filtrele
        </button>
      </div>
    </div>
  );
}

export default SearchFilter;