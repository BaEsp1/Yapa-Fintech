const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     description: Endpoint para iniciar sesión, proporcionando las credenciales del usuario. Retorna un token JWT para autenticación en futuras solicitudes.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Retorna un token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Credenciales inválidas. No se pudo autenticar al usuario.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', loginController.login);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Endpoint para registrar un nuevo usuario en el sistema. El usuario debe proporcionar un correo electrónico, contraseña, y otros detalles necesarios para completar el registro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               // Puedes agregar otros campos que consideres necesarios para el registro
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente. Retorna los detalles del usuario registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Datos incompletos o inválidos. No se pudo completar el registro.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', loginController.register);


module.exports = router;
