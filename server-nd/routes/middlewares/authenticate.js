const jwt = require('jsonwebtoken');
const { User } = require('../../dataBase/dataBase');
const Secret_Key_JWT = process.env.Secret_Key_JWT

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, Secret_Key_JWT, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    req.user = user; 
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: solo admin' });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
