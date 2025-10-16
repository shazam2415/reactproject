// backend/middleware/uploadMiddleware.js

const multer = require('multer');
const path = require('path');

// 1. Resimlerin nereye kaydedileceğini ve dosya adının ne olacağını belirle
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Resimler 'uploads/' klasörüne kaydedilecek
  },
  filename: function (req, file, cb) {
    // Dosya adını benzersiz hale getir: orijinal_ad-zaman_damgası.uzantı
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// 2. Sadece resim dosyalarının yüklenebilmesini sağlayan bir filtre oluştur
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Hata: Sadece resim dosyaları yüklenebilir!');
};

// 3. Multer middleware'ini yapılandır ve dışarı aktar
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Dosya boyutu limiti: 5MB
});

// 'image' -> formdaki input'un 'name' attribute'u olacak
module.exports = upload.single('image');