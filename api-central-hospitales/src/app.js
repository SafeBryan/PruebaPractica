const express = require('express');
const cors = require('cors');
const hospitalRoutes = require('./routes/hospitalRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const especialidadRoutes = require('./routes/especialidadRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const initDB = require('./config/initDB'); 
require('dotenv').config();

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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [
      {
        url: `http://localhost:${port}/api`,
        description: 'Servidor local'
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// 🚀 Rutas públicas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger público
app.use('/api/auth', authRoutes);

// 🚀 Middleware para proteger solo rutas privadas
app.use((req, res, next) => {
  // Si la ruta empieza con /api-docs o /api/auth, NO protegemos
  if (req.path.startsWith('/api-docs') || req.path.startsWith('/api/auth')) {
    return next();
  }
  authController.verifyToken(req, res, next);
});

// 🚀 Rutas protegidas
app.use('/api/hospitales', hospitalRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/empleados', empleadoRoutes);

// 🚀 Inicializar la base de datos y arrancar servidor
initDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Servidor central escuchando en http://localhost:${port}`);
      console.log(`📘 Documentación de Swagger disponible en http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al inicializar la base de datos:', err);
    process.exit(1);
  });
