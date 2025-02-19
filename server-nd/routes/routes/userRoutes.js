const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios (solo si es admin)
 *     description: Endpoint que permite obtener una lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authMiddleware.verifyAdmin, userController.getAllUsers); 

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Endpoint que permite obtener los datos de un usuario específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authMiddleware.verifyToken, userController.getUserById); 

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Endpoint para actualizar la información de un usuario existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', authMiddleware.verifyToken, userController.updateUser);

/**
 * @swagger
 * /users/ban/{id}:
 *   put:
 *     summary: Bannear un usuario (solo si es admin)
 *     description: Endpoint que permite bannear a un usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a bannear
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario baneado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/ban/:id', authMiddleware.verifyAdmin, userController.banUser);

/**
 * @swagger
 * /users/desban/{id}:
 *   put:
 *     summary: Desbannear un usuario (solo si es admin)
 *     description: Endpoint que permite desbannear a un usuario previamente baneado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a desbannear
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario desbaneado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/desban/:id', authMiddleware.verifyAdmin, userController.desBanUser);

module.exports = router;
