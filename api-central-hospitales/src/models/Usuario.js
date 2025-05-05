const pool = require('../config/database');

class Usuario {
  static async create({ username, password, rol = 'doctor', medico_id = null }) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO usuarios (username, password, rol, medico_id) VALUES (?, ?, ?, ?)',
        [username, password, rol, medico_id]
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }

  static async findOne({ username }) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM usuarios WHERE username = ?',
        [username]
      );
      return rows[0]; // Devuelve el objeto completo, incluyendo rol y medico_id
    } finally {
      connection.release();
    }
  }
}

module.exports = Usuario;
