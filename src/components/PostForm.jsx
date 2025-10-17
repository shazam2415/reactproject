import React, { useState, useEffect } from 'react';

function PostForm({ initialData = {}, onSubmit, isLoading, submitButtonText }) {
  const [post, setPost] = useState({
    title: '',
    description: '',
    city: '',
    status: 'kayip',
    ...initialData,
  });
  const [ imageFile, setImageFile ] = useState(null);

  useEffect(() => {
    setPost(prev => ({ ...prev, ...initialData }));
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('city', post.city);
    formData.append('status', post.status);

    if (imageFile) formData.append('image', imageFile);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">İlan Başlığı</label>
        <input
          id="title" name="title" type="text" required value={post.title} onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Açıklama</label>
        <textarea
          id="description" name="description" rows="4" value={post.description} onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Şehir</label>
        <input
          id="city" name="city" type="text" required value={post.city} onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Durum</label>
        <select
          id="status" name="status" value={post.status} onChange={handleChange}
          className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="kayip">Kayıp</option>
          <option value="bulundu">Bulundu</option>
        </select>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">İlan Resmi</label>
        <input
          id="image" name="image" type="file" onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-blue-200 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <div>
        <button
          type="submit" disabled={isLoading}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isLoading ? 'İşlem Sürüyor...' : submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default PostForm;