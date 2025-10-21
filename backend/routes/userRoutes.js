// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const db = require('../db'); // PostgreSQL bağlantı dosyanız
const { protect } = require('../middleware/authMiddleware'); // Sizin auth middleware'iniz
const uploadAvatar = require('../middleware/uploadAvatar'); // Az önce oluşturduğumuz multer middleware'i
const fs = require('fs'); // YENİ
const path = require('path'); // YENİ

// POST /api/users/upload-avatar
// Bu, React (Frontend) tarafının çağıracağı tam yoldur.
router.post(
  '/api/users/upload-avatar',
  protect,                     // 1. Önce: Token'ı doğrula, req.user'ı oluştur
  uploadAvatar,                // 2. Sonra: Resmi diske kaydet, req.file'ı oluştur
  async (req, res) => {
    
    // uploadAvatar middleware'i dosyayı işlemiş olmalı
    if (!req.file) {
      return res.status(400).send({ message: 'Dosya yüklenemedi veya resim formatında değil.' });
    }

    // Dosyanın tam URL'sini oluştur
    // Örn: http://localhost:5000/uploads/avatars/user-123-1678... .jpg
    // (Sunucuya deploy edince 'localhost:5000' kısmı otomatik olarak sunucu adresinizle değişir)
    const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;
    
    // 'protect' middleware'inden gelen ID (req.user = { userId: ... })
    const userId = req.user.userId; 

    try {
      // Veritabanındaki 'users' tablosunu yeni 'avatarUrl' ile güncelle
      const query = `
        UPDATE users 
        SET "avatarUrl" = $1 
        WHERE id = $2 
        RETURNING "avatarUrl"
      `;
      const values = [avatarUrl, userId];
      
      const result = await db.query(query, values); 

      if (result.rows.length === 0) {
        return res.status(404).send({ message: 'Kullanıcı veritabanında bulunamadı.' });
      }

      // BAŞARILI: React'a (Frontend'e) yeni ve kalıcı URL'yi yolla
      // React'taki handleImageSubmit fonksiyonu tam olarak bu yanıtı bekliyor.
      res.status(200).send({
        message: 'Profil resmi başarıyla güncellendi.',
        avatarUrl: result.rows[0].avatarUrl 
      });

    } catch (error) {
      console.error('Veritabanı güncelleme hatası:', error);
      res.status(500).send({ message: 'Sunucu hatası (Veritabanı).' });
    }
  }
);

router.delete(
  '/api/users/remove-avatar',
  protect, // 1. Kullanıcının giriş yaptığından emin ol
  async (req, res) => {
    const userId = req.user.userId;

    try {
      // 2. (Önemli) Silmeden önce mevcut resmin URL'sini al
      const currentQuery = 'SELECT "avatarUrl" FROM users WHERE id = $1';
      const { rows: currentRows } = await db.query(currentQuery, [userId]);
      const currentAvatarUrl = currentRows[0]?.avatarUrl;

      // 3. Veritabanını güncelle: avatarUrl'i NULL yap
      const updateQuery = `
        UPDATE users 
        SET "avatarUrl" = NULL 
        WHERE id = $1 
        RETURNING "avatarUrl"
      `;
      const { rows } = await db.query(updateQuery, [userId]);

      // 4. (En İyi Pratik) Eski dosyayı sunucudan sil
      if (currentAvatarUrl) {
        try {
          // URL'den dosya adını çek (örn: 'user-1-123.jpg')
          const filename = currentAvatarUrl.split('/uploads/avatars/')[1];
          // Dosyanın tam yolunu bul
          const filePath = path.join(__dirname, '..', 'public/uploads/avatars', filename);

          // Dosya varsa sil
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (fileErr) {
          // Dosya silinemezse bile ana işlem başarılıdır, bu yüzden sadece logla
          console.error('Eski avatar dosyası silinirken hata oluştu:', fileErr.message);
        }
      }

      // 5. Frontend'e başarılı yanıtı (ve yeni null URL'yi) gönder
      res.status(200).send({
        message: 'Profil resmi kaldırıldı.',
        avatarUrl: rows[0].avatarUrl // Bu 'null' olarak dönecektir
      });

    } catch (error) {
      console.error('Avatar kaldırma hatası:', error);
      res.status(500).send({ message: 'Sunucu hatası (Veritabanı).' });
    }
  }
);

module.exports = router;