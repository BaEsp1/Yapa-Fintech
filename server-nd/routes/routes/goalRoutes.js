const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * /goals:
 *   get:
 *     summary: Ver todas las metas de ahorro del usuario
 *     description: Endpoint que permite ver todas las metas de ahorro de un usuario.
 *     responses:
 *       200:
 *         description: Lista de metas
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authMiddleware.verifyToken, goalController.getAllGoals);

/**
 * @swagger
 * /goals/{id}:
 *   get:
 *     summary: Ver una meta de ahorro por ID
 *     description: Endpoint que permite ver una meta de ahorro específica por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la meta de ahorro
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Meta encontrada
 *       404:
 *         description: Meta no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authMiddleware.verifyToken, goalController.getGoalById);

/**
 * @swagger
 * /goals:
 *   post:
 *     summary: Crear una nueva meta de ahorro
 *     description: Endpoint para crear una meta de ahorro.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               targetAmount:
 *                 type: float
 *               startDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Meta creada exitosamente
 *       400:
 *         description: Error al crear la meta
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', authMiddleware.verifyToken, goalController.createGoal);


module.exports = router;
