// src/pages/CreatePostPage.jsx
import PostForm from '../components/PostForm';

function CreatePostPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Yeni Bir İlan Oluştur
          </h1>
          <p className="mt-2 text-md text-gray-600">
            Dostlarımızın yuvalarına kavuşmasına yardımcı ol.
          </p>
        </div>

        <div className="mt-8">
          <PostForm />
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;