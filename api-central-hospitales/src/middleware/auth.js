const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;  // Cambia esta clave por una más segura

function verifyToken(req, res, next) {
  // Obtener el token de los encabezados de la solicitud
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // Verificar el token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token no válido' });
    }
    req.user = decoded;  // Decodificar el token y agregar la información al objeto request
    next();
  });
}

module.exports = verifyToken;
