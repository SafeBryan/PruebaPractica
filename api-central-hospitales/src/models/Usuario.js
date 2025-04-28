const pool = require('../config/database');
class Usuario {
  static async crear({ nombre_usuario, contraseña, rol, hospital_id }) {
    const connection = await pool.getConnection();

    const [result] = await  connection.execute(`
      INSERT INTO usuarios (nombre_usuario, contraseña, rol, hospital_id)
      VALUES (?, ?, ?, ?)
    `, [nombre_usuario, contraseña, rol, hospital_id]);
    return result.insertId;
  }

  static async obtenerPorNombre(nombre_usuario) {
    const connection = await pool.getConnection();

    const [rows] = await connection.execute(`
      SELECT * FROM usuarios WHERE nombre_usuario = ?
    `, [nombre_usuario]);
    return rows[0];
  }

  static async obtenerTodos() {
    const connection = await pool.getConnection();

    const [rows] = await connection.execute(`SELECT * FROM usuarios`);
    return rows;
  }
}

module.exports = Usuario;
