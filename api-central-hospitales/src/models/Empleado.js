const pool = require('../config/database');

class Empleado {
  static async create({ nombre, cargo, hospital_id }) { 
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [result] = await connection.execute(
        'INSERT INTO empleados (nombre, cargo, hospital_id) VALUES (?, ?, ?)',
        [nombre, cargo, hospital_id]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findAllByHospital(hospital_id) { 
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM empleados WHERE hospital_id = ?',
        [hospital_id]
      );
      return rows;
     
    } catch (error) {
      console.error('Error al obtener empleados por hospital:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findAll() {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute('SELECT * FROM empleados');
      return rows;
    } catch (error) {
      console.error('Error al obtener todos los empleados:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async findById(id) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      const [rows] = await connection.execute('SELECT * FROM empleados WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error al obtener empleado por ID:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async update(id, { nombre, cargo, hospital_id }) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      await connection.execute(
        'UPDATE empleados SET nombre = ?, cargo = ?, hospital_id = ? WHERE id = ?',
        [nombre, cargo, hospital_id, id]
      );
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection(); // Obtener conexión del pool
    try {
      await connection.execute('DELETE FROM empleados WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      throw error;
    } finally {
      connection.release(); // Liberar la conexión
    }
  }
}

module.exports = Empleado;
