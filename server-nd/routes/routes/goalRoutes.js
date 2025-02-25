const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalControllers');
const { verifyToken } = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Metas
 *   description: Endpoints relacionados con las metas de ahorro del usuario
 */

/**
 * @swagger
 * /goals:
 *   get:
 *     summary: Ver todas las metas de ahorro del usuario
 *     tags: [Metas]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de metas obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', verifyToken, goalController.getAllGoals);

/**
 * @swagger
 * /goals/{id}:
 *   get:
 *     summary: Ver una meta de ahorro por ID
 *     tags: [Metas]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
router.get('/:id', verifyToken, goalController.getGoalById);

/**
 * @swagger
 * /goals:
 *   post:
 *     summary: Crear una nueva meta de ahorro
 *     tags: [Metas]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               targetAmount:
 *                 type: number
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
router.post('/', verifyToken, goalController.createGoal);

/**
 * @swagger
 * /goals/{id}:
 *   put:
 *     summary: Actualizar una meta de ahorro
 *     tags: [Metas]
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               targetDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meta actualizada exitosamente
 *       404:
 *         description: Meta no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', verifyToken, goalController.updateGoal);

/**
 * @swagger
 * /goals/{id}:
 *   delete:
 *     summary: Eliminar una meta de ahorro
 *     tags: [Metas]
 *     security:
 *     - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Meta eliminada exitosamente
 *       404:
 *         description: Meta no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', verifyToken, goalController.deleteGoal);

module.exports = router;
