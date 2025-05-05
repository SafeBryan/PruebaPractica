-- Crear el usuario solo si no existe
CREATE USER IF NOT EXISTS 'hospital1_user'@'%' IDENTIFIED BY 'password123';

-- Dar todos los privilegios sobre la base de datos `hospital1`
GRANT ALL PRIVILEGES ON hospital1.* TO 'hospital1_user'@'%';

-- Aplicar los cambios
FLUSH PRIVILEGES;
