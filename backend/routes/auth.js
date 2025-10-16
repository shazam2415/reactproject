// backend/routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // db.js dosyamızı import ediyoruz
const jwt = require('jsonwebtoken'); // Yeni eklenen

const router = express.Router();

// POST /api/auth/register - Yeni kullanıcı kaydı
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Gelen veriyi kontrol et
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur.' });
  }

  try {
    // Şifreyi hash'le
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Yeni kullanıcıyı veritabanına ekle
    const newUserQuery = `
      INSERT INTO users (name, email, password_hash) 
      VALUES ($1, $2, $3) 
      RETURNING id, name, email;
    `;
    
    const { rows } = await db.query(newUserQuery, [name, email, passwordHash]);

    // Başarılı olursa yeni kullanıcıyı geri döndür (şifre olmadan)
    res.status(201).json(rows[0]);

  } catch (err) {
    console.error('Kayıt hatası:', err);
    // E-posta zaten varsa PostgreSQL 'unique constraint' hatası verir
    if (err.code === '23505') {
        return res.status(409).json({ error: 'Bu e-posta adresi zaten kullanılıyor.' });
    }
    res.status(500).json({ error: 'Sunucu hatası, lütfen tekrar deneyin.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if ( !email ) return res.status(400).json({ error: 'E-posta ve şifre zorunludur.' });

  try {
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(userQuery, [email]);

    if ( rows.length === 0 ) return res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });

    const user = rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) return res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });

    const token = jwt.sign(
      { userId: user.id, name: user.name }, // Token'ın içine hangi bilgileri koyacağımız
      process.env.JWT_SECRET, // .env'den gelen gizli anahtar
      { expiresIn: '1h' } // Token'ın ne kadar süre geçerli olacağı (1 saat)
    );

    res.status(200).json({
      message: 'Giriş başarılı!',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });


  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası, lütfen tekrar deneyin.' });
  }
});


module.exports = router;
