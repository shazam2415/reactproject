function PostForm({ existingPost }) {

  const isEditMode = Boolean(existingPost);

  return (
    <form className="space-y-6 w-full">
      <div>
        <label className="text-base font-medium text-gray-900">İlan Durumu</label>
        <fieldset className="mt-2">

          <div className="flex items-center space-x-6">
            <div className="flex items-center">

              <input id="kayip" name="status" type="radio" 
                defaultChecked={!isEditMode || existingPost.status === 'Kayıp'} 
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"/>
              <label htmlFor="kayip" className="ml-3 block text-sm font-medium text-gray-700">Kayıp</label>

            </div>
            <div className="flex items-center">
              <input id="bulundu" name="status" type="radio" 

                defaultChecked={isEditMode && existingPost.status === 'Bulundu'} 
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"/>
              <label htmlFor="bulundu" className="ml-3 block text-sm font-medium text-gray-700">Bulundu</label>
            </div>
          </div>
        </fieldset>
      </div>

      {/* 2. Hayvan Bilgileri */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label htmlFor="animal-name" className="block text-sm font-medium text-gray-700">Hayvanın Adı</label>
          <input type="text" name="animal-name" id="animal-name" 
            // Mevcut veriyi input'un başlangıç değeri yap
            defaultValue={existingPost?.name}
            className="p-2 mt-1 block border w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="animal-type" className="block text-sm font-medium text-gray-700">Türü</label>
          <select id="animal-type" name="animal-type" 
            defaultValue={existingPost?.type}
            className="p-2 mt-1 block border w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>Kedi</option>
            <option>Köpek</option>
            <option>Kuş</option>
            <option>Diğer</option>
          </select>
        </div>
      </div>
      
      {/* Diğer alanlar da aynı mantıkla defaultValue alacak... */}
      {/* 3. Konum Bilgileri */}
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Şehir</label>
          <input type="text" name="city" id="city" 
            defaultValue={existingPost?.city}
            className="p-2 mt-1 block border w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
        </div>
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">İlçe</label>
          <input type="text" name="district" id="district" 
            defaultValue={existingPost?.district}
            className="p-2 mt-1 block border w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
        </div>
      </div>

      {/* 4. Açıklama */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama</label>
        <div className="mt-1 border">
          <textarea rows={4} name="description" id="description" 
            defaultValue={existingPost?.description}
            className="p-2 block w-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Ayırt edici özellikleri..."></textarea>
        </div>
      </div>
      
      <div>
        <button type="submit" className="flex w-full justify-center border border-transparent bg-blue-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700">
          {/* Düzenleme moduna göre butonun yazısını değiştir */}
          {isEditMode ? 'Değişiklikleri Kaydet' : 'İlanı Yayınla'}
        </button>
      </div>
    </form>
  );
}

export default PostForm;