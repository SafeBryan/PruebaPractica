const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioController = {
  async crearUsuario(req, res) {
    try {
      const { nombre_usuario, contraseña, rol, hospital_id } = req.body;

      if (!nombre_usuario || !contraseña || !rol) {
        return res.status(400).json({ mensaje: 'Faltan campos obligatorios' });
      }

      const hash = await bcrypt.hash(contraseña, 10);
      const id = await Usuario.crear({ nombre_usuario, contraseña: hash, rol, hospital_id });

      res.status(201).json({ mensaje: 'Usuario creado', id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear el usuario' });
    }
  },
  async login(req, res) {
    try {
      const { nombre_usuario, contraseña } = req.body;

      if (!nombre_usuario || !contraseña) {
        return res.status(400).json({ mensaje: 'Nombre de usuario y contraseña requeridos' });
      }

      const usuario = await Usuario.obtenerPorNombre(nombre_usuario);

      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }

      const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);

      if (!validPassword) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        {
          id: usuario.id,
          nombre_usuario: usuario.nombre_usuario,
          rol: usuario.rol,
          hospital_id: usuario.hospital_id
        },
        process.env.JWT_SECRET,
      );

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }
  },
  async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.obtenerTodos();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
  }
};

module.exports = usuarioController;
