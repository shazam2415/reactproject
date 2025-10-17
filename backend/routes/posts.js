// backend/routes/posts.js

const express = require('express');
const db = require('../db');
const { protect } = require('../middleware/authMiddleware'); // Middleware'i import et
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // <-- ADD THIS LINE

router.get('/my-posts', protect, async (req, res) => {
  const userId = req.user.userId;
  try {
    const myPostsQuery = 'SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC';
    const { rows } = await db.query(myPostsQuery, [userId]);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Kullanıcının ilanları çekilirken hata:', err);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// --- DEĞİŞTİRİLMİŞ GET ALL POSTS ROUTE'U (Sayfalama ve Filtreleme ile) ---
router.get('/', async (req, res) => {
  // 1. Sorgu parametrelerini al ve varsayılan değerler ata
  const { search, city, status } = req.query;
  const page = parseInt(req.query.page) || 1; // Sayfa numarası, varsayılan 1
  const limit = parseInt(req.query.limit) || 12; // Sayfa başına ilan sayısı, varsayılan 12
  const offset = (page - 1) * limit; // Veritabanında nereden başlanacak

  try {
    // --- TEMEL SORGULARIN OLUŞTURULMASI ---
    let values = [];
    let whereClauses = [];
    let paramIndex = 1;

    // Filtreleme koşullarını oluştur (bu kısım aynı)
    if (search) {
      whereClauses.push(`posts.title ILIKE $${paramIndex}`);
      values.push(`%${search}%`);
      paramIndex++;
    }
    if (city) {
      whereClauses.push(`posts.city ILIKE $${paramIndex}`);
      values.push(`%${city}%`);
      paramIndex++;
    }
    if (status) {
      whereClauses.push(`posts.status = $${paramIndex}`);
      values.push(status);
      paramIndex++;
    }

    const whereString = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // --- YENİ ADIM: TOPLAM İLAN SAYISINI HESAPLA ---
    const countQuery = `SELECT COUNT(*) FROM posts ${whereString}`;
    const countResult = await db.query(countQuery, values);
    const totalPosts = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalPosts / limit);

    // --- YENİ ADIM: SAYFALANMIŞ VERİYİ ÇEK ---
    const dataQuery = `
      SELECT 
        posts.id, posts.title, posts.city, posts.image_url, posts.created_at, posts.status, 
        users.name AS author_name 
      FROM posts 
      JOIN users ON posts.user_id = users.id 
      ${whereString}
      ORDER BY posts.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1};
    `;
    
    // Veri sorgusunun değerlerine LIMIT ve OFFSET'i ekle
    const dataValues = [...values, limit, offset];
    const { rows: posts } = await db.query(dataQuery, dataValues);

    // --- YANITI GÖNDER ---
    // Sadece ilanları değil, sayfalama bilgilerini de gönder
    res.status(200).json({
      posts,
      pagination: {
        totalPosts,
        totalPages,
        currentPage: page,
        limit,
      }
    });
    
  } catch (err) {
    console.error('İlanları getirme hatası:', err);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// POST /api/posts - Yeni bir ilan oluştur (KORUMALI)
// Önce 'protect' middleware'i çalışır, sonra (req, res) fonksiyonu.
router.post('/', protect, upload, async (req, res) => {
  const { title, description, city, status } = req.body; // Metin verileri req.body'den gelir
  const userId = req.user.userId;

  // Dosya yüklendiyse, dosya yolu req.file.path'ten gelir.
  // Yüklenmediyse, null olur.
  const imageUrl = req.file ? req.file.path : null;

  if (!title || !city) {
    return res.status(400).json({ error: 'Başlık ve şehir zorunludur.' });
  }

  try {
    const newPostQuery = `
      INSERT INTO posts (user_id, title, description, city, status, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [userId, title, description, city, status || 'kayip', imageUrl];
    const { rows } = await db.query(newPostQuery, values);

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

router.put('/:id', protect, upload, async (req, res) => {
  const { id } = req.params;
  const { title, description, city, status } = req.body;
  const userId = req.user.userId;

  try {
    // 1. First, find the post to check for ownership and get the old image URL
    const findPostQuery = 'SELECT user_id, image_url FROM posts WHERE id = $1';
    const { rows: postRows } = await db.query(findPostQuery, [id]);

    if (postRows.length === 0) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }
    if (postRows[0].user_id !== userId) {
      return res.status(403).json({ error: 'Bu işlemi yapmaya yetkiniz yok.' });
    }

    // 2. Decide which image URL to save
    // If a new file is uploaded (`req.file` exists), use its path. Otherwise, keep the old one.
    const newImageUrl = req.file ? req.file.path : postRows[0].image_url;

    // 3. Update the post in the database with all fields
    const updatePostQuery = `
      UPDATE posts 
      SET title = $1, description = $2, city = $3, status = $4, image_url = $5 
      WHERE id = $6 
      RETURNING *;
    `;
    const values = [title, description, city, status, newImageUrl, id];
    const { rows: updatedRows } = await db.query(updatePostQuery, values);

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