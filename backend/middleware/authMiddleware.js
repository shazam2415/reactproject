// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;
  
  // Token, genellikle 'Authorization' header'ında 'Bearer TOKEN_DEGERI' formatında gelir
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 'Bearer ' kısmını atıp sadece token'ı al
      token = req.headers.authorization.split(' ')[1];

      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token'dan çıkardığımız kullanıcı bilgisini isteğe (req) ekle.
      // Böylece sonraki route handler'lar bu bilgiye erişebilir.
      req.user = decoded;

      next(); // Her şey yolundaysa, bir sonraki adıma geç
    } catch (error) {
      console.error('Token doğrulama hatası:', error);
      res.status(401).json({ error: 'Yetkiniz yok, token geçersiz.' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Yetkiniz yok, token bulunamadı.' });
  }
};

module.exports = { protect };