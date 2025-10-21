// backend/middleware/uploadAvatar.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 1. Dosya yolunu 'public' klasörünün içine alıyoruz
    // (Böylece http://.../uploads/avatars/dosya.jpg olarak erişilebilir olur)
    const uploadPath = './public/uploads/avatars';
    
    // Klasörün var olduğundan emin ol (yoksa oluştur)
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 2. 'protect' (authMiddleware) tarafından sağlanan 'userId'ı kullanıyoruz
    // (req.user'ın { userId: '...' } içerdiğini varsayıyoruz)
    if (!req.user || !req.user.userId) {
      return cb(new Error('Dosya yüklemek için giriş yapmalısınız! (User ID bulunamadı)'), false);
    }

    const userId = req.user.userId; // 'protect'ten gelen ID
    const fileExt = path.extname(file.originalname); // .jpg, .png vb.
    // Dosya adını benzersiz hale getiriyoruz: user-123-167888... .jpg
    const newName = `user-${userId}-${Date.now()}${fileExt}`;
    cb(null, newName);
  }
});

// Sadece resim dosyalarına izin ver
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyaları yüklenebilir!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// 3. React (Frontend) ile uyumlu 'profilePicture' ismini kullanıyoruz
// (Frontend'de formData.append('profilePicture', ...) yazmıştık)
module.exports = upload.single('profilePicture');