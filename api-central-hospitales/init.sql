-- Crear la base de datos (opcional, se crea automáticamente con MARIADB_DATABASE)
CREATE DATABASE IF NOT EXISTS api_central_hospitales;

-- Crear usuario y permisos (redundante por MARIADB_USER, pero por si acaso)
CREATE USER IF NOT EXISTS 'safebryan'@'%' IDENTIFIED BY '081012';
GRANT ALL PRIVILEGES ON api_central_hospitales.* TO 'safebryan'@'%';
FLUSH PRIVILEGES;
