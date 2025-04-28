const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { getConnection } = require('../config/database');
require('dotenv').config();

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, username: usuario.username },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
};

exports.registrar = async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      

      const id = await Usuario.create({ username, password: hashedPassword });
  

      const usuario = { id, username };
  
      const token = generarToken(usuario);
      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({ username });
    
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const token = generarToken(usuario);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id;
    next();
  });
};