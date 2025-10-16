// src/pages/CreatePostPage.jsx
import PostForm from '../components/PostForm';

function CreatePostPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      
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
  );
}

export default CreatePostPage;