// backend/index.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./db');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// --- 1. Genel Middleware'ler ---
// Gelen tüm istekler önce buradan geçer.
app.use(cors());
app.use(express.json());

// --- 2. Statik Dosya Servisi ---
// '/uploads' ile başlayan istekler, 'uploads' klasöründeki dosyaları sunar.
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- 3. API Rotaları ---
// API ile ilgili tüm istekler burada yönetilir.
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use(userRoutes);

// --- 4. Test ve Kök Rotaları ---
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      message: 'Veritabanı bağlantısı başarılı!',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error('Veritabanı bağlantı hatası:', err);
    res.status(500).json({ error: 'Veritabanına bağlanılamadı.' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Evine Dön Backend API Çalışıyor! 🐾' });
});

// --- 5. Sunucuyu Başlatma ---
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});