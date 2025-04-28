const pool = require('../config/database');

class Usuario {
    static async create({ username, password }) {
      const connection = await pool.getConnection();
      try {
        const [result] = await connection.execute(
          'INSERT INTO usuarios (username, password) VALUES (?, ?)',
          [username, password]
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
        return rows[0];
      } finally {
        connection.release();
      }
    }
  }
  

module.exports = Usuario;