require('dotenv').config();
const pool = require('./database');
const mysql = require('mysql2/promise');

async function createDatabaseAndUser() {
  const rootConnection = await mysql.createConnection({
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
    user: process.env.MARIADB_ROOT_USER,
    password: process.env.MARIADB_ROOT_PASSWORD,
  });

  await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MARIADB_DATABASE}\``);

  await rootConnection.query(`
    CREATE USER IF NOT EXISTS '${process.env.MARIADB_USER}'@'%' IDENTIFIED BY '${process.env.MARIADB_PASSWORD}'
  `);

  await rootConnection.query(`
    GRANT ALL PRIVILEGES ON \`${process.env.MARIADB_DATABASE}\`.* TO '${process.env.MARIADB_USER}'@'%'
  `);

  await rootConnection.query(`FLUSH PRIVILEGES`);
  await rootConnection.end();

  console.log('✅ Base de datos y usuario verificados');
}

async function createTables() {
  const connection = await pool.getConnection();  // Obtén una conexión del pool

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS hospitales (
      id VARCHAR(255) PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      direccion VARCHAR(255),
      url_api VARCHAR(255)
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS especialidades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL
    )
  `);
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre_usuario VARCHAR(100) NOT NULL UNIQUE,
      contraseña VARCHAR(255) NOT NULL,
      rol ENUM('admin', 'medico', 'empleado') NOT NULL,
      hospital_id VARCHAR(255),
      FOREIGN KEY (hospital_id) REFERENCES hospitales(id) ON DELETE SET NULL
    )
  `);
  
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS medicos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      especialidad_id INT,
      hospital_id VARCHAR(255),
      FOREIGN KEY (especialidad_id) REFERENCES especialidades(id) ON DELETE SET NULL,
      FOREIGN KEY (hospital_id) REFERENCES hospitales(id) ON DELETE CASCADE
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS empleados (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      cargo VARCHAR(100),
      hospital_id VARCHAR(255),
      FOREIGN KEY (hospital_id) REFERENCES hospitales(id) ON DELETE CASCADE
    )
  `);
  const [hospitals] = await connection.execute(`
    SELECT COUNT(*) as total FROM hospitales
  `);

  let hospitalId = null;

  if (hospitals[0].total === 0) {
    hospitalId = `HOSP-${Date.now()}`; // genera un ID único basado en el tiempo
    await connection.execute(`
      INSERT INTO hospitales (id, nombre, direccion, url_api)
      VALUES (?, ?, ?, ?)
    `, [hospitalId, 'Hospital Principal', 'Dirección de ejemplo', 'https://api.hospitalprincipal.com']);

    console.log('✅ Hospital por defecto creado');
  } else {
    // Si ya hay hospital, tomar el primero
    const [existing] = await connection.execute(`SELECT id FROM hospitales LIMIT 1`);
    hospitalId = existing[0].id;
  }

  // Crear usuario admin por defecto si no existe
  const [users] = await connection.execute(`
    SELECT COUNT(*) as total FROM usuarios WHERE nombre_usuario = ?
  `, ['admin']);

  if (users[0].total === 0) {
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await connection.execute(`
      INSERT INTO usuarios (nombre_usuario, contraseña, rol, hospital_id)
      VALUES (?, ?, ?, ?)
    `, ['admin', hashedPassword, 'admin', hospitalId]);

    console.log('✅ Usuario admin creado');
  }

  connection.release(); 

  console.log('✅ Tablas creadas (si no existían)');
}

async function initDB() {
  await createDatabaseAndUser();
  await createTables();
}

module.exports = initDB;
