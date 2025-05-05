-- Crear el usuario solo si no existe
CREATE USER IF NOT EXISTS 'hospital2_user'@'%' IDENTIFIED BY 'password123';

-- Dar todos los privilegios sobre la base de datos `hospital1`
GRANT ALL PRIVILEGES ON hospital2.* TO 'hospital2_user'@'%';

-- Aplicar los cambios
FLUSH PRIVILEGES;
