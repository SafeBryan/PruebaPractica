-- init.sql
CREATE USER IF NOT EXISTS 'safebryan'@'%' IDENTIFIED BY '081012';
GRANT ALL PRIVILEGES ON consultas_medicas.* TO 'safebryan'@'%';
FLUSH PRIVILEGES;
