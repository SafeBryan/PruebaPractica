const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nombre_usuario
 *         - contraseña
 *         - rol
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado
 *         nombre_usuario:
 *           type: string
 *           description: Nombre de usuario único
 *         contraseña:
 *           type: string
 *           description: Contraseña hasheada
 *         rol:
 *           type: string
 *           enum: [admin, medico, empleado]
 *           description: Rol del usuario
 *         hospital_id:
 *           type: string
 *           description: ID del hospital (opcional)
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/usuarios', usuarioController.crearUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/usuarios', usuarioController.listarUsuarios);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_usuario
 *               - contraseña
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT generado exitosamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: Credenciales incorrectas
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/login', usuarioController.login);

module.exports = router;
