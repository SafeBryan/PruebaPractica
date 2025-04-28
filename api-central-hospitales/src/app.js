const express = require('express');
const cors = require('cors');
const hospitalRoutes = require('./routes/hospitalRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const especialidadRoutes = require('./routes/especialidadRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const initDB = require('./config/initDB'); 
require('dotenv').config();
const usuarioRoutes = require('./routes/usuarios');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Central de Hospitales',
      version: '1.0.0',
      description: 'API para gestionar hospitales, médicos, especialidades y empleados.',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: 'Servidor local'
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Asegúrate que tus rutas están en ./src/routes o ajusta esto
};

const swaggerSpec = swaggerJsdoc(options);

// Rutas de la API
app.use('/api/hospitales', hospitalRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api', usuarioRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializar la base de datos antes de levantar el servidor
initDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Servidor central escuchando en http://localhost:${port}`);
      console.log(`📘 Documentación de Swagger disponible en http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al inicializar la base de datos:', err);
    process.exit(1); // salir si hay error en DB
  });
