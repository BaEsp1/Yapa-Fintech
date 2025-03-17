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
 *               description:
 *                 type: string
 *                 description: Descripción detallada de la meta.
 *               objectiveType:
 *                 type: string
 *                 description: Tipo de objetivo (por ejemplo, "ahorro", "inversión").
 *               frequency:
 *                 type: string
 *                 description: Frecuencia de la meta (por ejemplo, "mensual", "anual").
 *               amountObjective:
 *                 type: number
 *                 format: float
 *                 description: Cantidad total que se desea alcanzar para el objetivo.
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: Cantidad de dinero invertido.
 *               targetDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha objetivo para alcanzar la meta.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha objetivo para alcanzar la meta.
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *                 default: pending
 *                 description: Estado de la meta (por ejemplo, "pendiente", "en progreso", "completada").
 *               progress:
 *                 type: number
 *                 format: float
 *                 description: Porcentaje de progreso (debe estar entre 0 y 100).
 *     responses:
 *       201:
 *         description: Meta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Meta de ahorro creada exitosamente."
 *                 goal:
 *                   $ref: '#/components/schemas/Goal'
 *       400:
 *         description: Error al crear la meta debido a datos inválidos o faltantes
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
