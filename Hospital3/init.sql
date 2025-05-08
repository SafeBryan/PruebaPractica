-- Crear el usuario solo si no existe
CREATE USER IF NOT EXISTS 'hospital3_user'@'%' IDENTIFIED BY 'password123';

-- Dar todos los privilegios sobre la base de datos `hospital1`
GRANT ALL PRIVILEGES ON hospital3.* TO 'hospital3_user'@'%';

-- Aplicar los cambios
FLUSH PRIVILEGES;
