// backend/routes/posts.js

const express = require('express');
const db = require('../db');
const { protect } = require('../middleware/authMiddleware'); // Middleware'i import et

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // users tablosunu posts tablosuna user_id üzerinden bağla (JOIN)
    // ve kullanıcının adını da al. En yeni ilanlar en üstte olsun.
    const allPostsQuery = `
      SELECT 
        posts.id, 
        posts.title, 
        posts.city, 
        posts.image_url, 
        posts.created_at, 
        users.name AS author_name 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      ORDER BY posts.created_at DESC;
    `;

    const { rows } = await db.query(allPostsQuery);
    res.status(200).json(rows);
  } catch (err) {
    console.error('İlanları getirme hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// POST /api/posts - Yeni bir ilan oluştur (KORUMALI)
// Önce 'protect' middleware'i çalışır, sonra (req, res) fonksiyonu.
router.post('/', protect, async (req, res) => {
  const { title, description, city } = req.body;
  const userId = req.user.userId; // Middleware'in req'e eklediği kullanıcı ID'si

  if (!title || !city) {
    return res.status(400).json({ error: 'Başlık ve şehir zorunludur.' });
  }

  try {
    const newPostQuery = `
      INSERT INTO posts (user_id, title, description, city)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await db.query(newPostQuery, [userId, title, description, city]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('İlan oluşturma hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params; // URL'den gelen 'id' parametresini al

  try {
    const postDetailQuery = `
      SELECT 
        posts.*, 
        users.name AS author_name,
        users.email AS author_email 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      WHERE posts.id = $1;
    `;

    const { rows } = await db.query(postDetailQuery, [id]);

    // Eğer o ID'ye sahip bir ilan bulunamazsa
    if (rows.length === 0) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('İlan detayı getirme hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

router.put('/:id', protect, async (req, res) => {
  const { id } = req.params; // Güncellenecek ilanın ID'si
  const { title, description, city, status } = req.body; // Formdan gelen yeni veriler
  const userId = req.user.userId; // Token'dan gelen kullanıcı ID'si

  if (!title || !city || !status) {
    return res.status(400).json({ error: 'Başlık, şehir ve durum zorunludur.' });
  }

  try {
    // 1. Önce ilanı veritabanından bul ve sahibinin kim olduğunu kontrol et
    const findPostQuery = 'SELECT user_id FROM posts WHERE id = $1';
    const { rows: postRows } = await db.query(findPostQuery, [id]);

    if (postRows.length === 0) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }

    const postOwnerId = postRows[0].user_id;

    // 2. İsteği yapan kullanıcı, ilanın sahibi değilse, yetkisiz hatası ver
    if (postOwnerId !== userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok.' });
    }

    // 3. Kullanıcı doğruysa, ilanı güncelle
    const updatePostQuery = `
      UPDATE posts 
      SET title = $1, description = $2, city = $3, status = $4 
      WHERE id = $5 
      RETURNING *;
    `;
    const { rows: updatedRows } = await db.query(updatePostQuery, [title, description, city, status, id]);

    res.status(200).json(updatedRows[0]);
  } catch (err) {
    console.error('İlan güncelleme hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params; // Silinecek ilanın ID'si
  const userId = req.user.userId; // Token'dan gelen kullanıcı ID'si

  try {
    // 1. Önce ilanın sahibini kontrol et
    const findPostQuery = 'SELECT user_id FROM posts WHERE id = $1';
    const { rows } = await db.query(findPostQuery, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }

    // 2. Yetki kontrolü
    if (rows[0].user_id !== userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok.' });
    }

    // 3. İlanı sil
    await db.query('DELETE FROM posts WHERE id = $1', [id]);

    res.status(200).json({ message: 'İlan başarıyla silindi.' });
  } catch (err) {
    console.error('İlan silme hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

module.exports = router;