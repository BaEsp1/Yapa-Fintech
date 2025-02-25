const express = require('express');
const router = express.Router();
const operationController = require('../controllers/operationControllers');
const { verifyToken } = require('../middlewares/authenticate'); 

/**
 * @swagger
 * tags:
 *   name: Operaciones
 *   description: Endpoints relacionados con los movimientos del usuario
 */

/**
 * @swagger
 * /operations:
 *   get:
 *     summary: Obtener todas las operaciones del usuario autenticado
 *     tags: [Operaciones]
 *     security:
 *     - bearerAuth: []
 *     description: Obtiene todas las operaciones de compra o venta realizadas por el usuario.
 *     responses:
 *       200:
 *         description: Lista de operaciones obtenida correctamente.
 *       404:
 *         description: No se encontraron operaciones.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', verifyToken, operationController.getAllOperations);

/**
 * @swagger
 * /operations:
 *   post:
 *     summary: Crear una nueva operación
 *     tags: [Operaciones]
 *     security:
 *     - bearerAuth: []
 *     description: Registra una operación de compra o venta de instrumentos financieros.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idPortfoil:
 *                 type: integer
 *               instruments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idInstrument:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *                     pricePerUnit:
 *                       type: number
 *               operationType:
 *                 type: string
 *                 enum: [buy, sell]
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Operación creada exitosamente.
 *       400:
 *         description: Error en la operación (por ejemplo, saldo insuficiente o cantidad inválida).
 *       404:
 *         description: Portafolio no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/operations', verifyToken, operationController.createOperation);

/**
 * @swagger
 * /operations/{id}:
 *   get:
 *     summary: Obtener una operación específica por su ID
 *     tags: [Operaciones]
 *     security:
 *     - bearerAuth: []
 *     description: Obtiene los detalles de una operación específica del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la operación a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación encontrada exitosamente.
 *       404:
 *         description: Operación no encontrada o no autorizada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/operations/:id', verifyToken, operationController.getOperationById);

module.exports = router;