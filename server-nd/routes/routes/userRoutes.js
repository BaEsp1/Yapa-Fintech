const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const {verifyToken , verifyAdmin} = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestión de usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios (solo si es admin)
 *     tags: [Usuarios]
 *     security:
 *     - bearerAuth: []
 *     description: Retorna una lista con todos los usuarios registrados en el sistema.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 *       401:
 *         description: No autorizado (se requiere token de admin).
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *     - bearerAuth: []
 *     description: Obtiene la información de un usuario específico mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a buscar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', verifyToken, userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar la información de un usuario
 *     tags: [Usuarios]
 *     security:
 *     - bearerAuth: []
 *     description: Permite actualizar los datos personales de un usuario existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               country:
 *                 type: string
 *               photoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', verifyToken, userController.updateUser);

/**
 * @swagger
 * /users/ban/{id}:
 *   put:
 *     summary: Bannear un usuario (solo si es admin)
 *     tags: [Usuarios]
 *     security:
 *     - bearerAuth: []
 *     description: Cambia el estado de un usuario a "baneado".
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a bannear.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario baneado correctamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/ban/:id', verifyToken, verifyAdmin, userController.banUser);

/**
 * @swagger
 * /users/desban/{id}:
 *   put:
 *     summary: Desbannear un usuario (solo si es admin)
 *     tags: [Usuarios]
 *     security:
 *     - bearerAuth: []
 *     description: Restaura el acceso a un usuario previamente baneado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a desbannear.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario desbaneado correctamente.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/desban/:id', verifyToken, verifyAdmin, userController.desBanUser);

module.exports = router;