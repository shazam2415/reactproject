// backend/index.js

const express = require('express');
const cors = require('cors');
const db = require('./db');
const postRoutes = require('./routes/posts'); // YENİ

// --- YENİ ---
// Route dosyalarını import et
const authRoutes = require('./routes/auth');
// -----------------

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- YENİ ---
// Ana route'ları belirle
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // YENİ
// -----------------

// Test route'ları (bunları daha sonra silebilirsin)
app.get('/test-db', async (req, res) => {
  // ... (bu kod aynı kalabilir)
});

app.get('/', (req, res) => {
  res.json({ message: 'Evine Dön Backend API Çalışıyor! 🐾' });
});


app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});