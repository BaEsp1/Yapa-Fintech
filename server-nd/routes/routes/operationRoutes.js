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
 * /operations/buy:
 *   post:
 *     summary: Comprar un instrumento financiero
 *     tags: [Operaciones]
 *     security:
 *       - bearerAuth: []
 *     description: Registra una operación de compra de un instrumento financiero y actualiza el portafolio y balance del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instrument:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   symbol:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: integer
 *                   type:
 *                     type: string
 *               currency:
 *                 type: string
 *               subTotal:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Compra procesada exitosamente. El portafolio y balance del usuario se han actualizado.
 *       400:
 *         description: Error en la operación (por ejemplo, saldo insuficiente o cantidad inválida).
 *       404:
 *         description: Portafolio no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/operations/buy', verifyToken, operationController.buyInstrument);

/**
 * @swagger
 * /operations/sell:
 *   post:
 *     summary: Vender un instrumento financiero
 *     tags: [Operaciones]
 *     security:
 *       - bearerAuth: []
 *     description: Registra una operación de venta de un instrumento financiero, actualizando el portafolio y balance del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instrument:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   price:
 *                     type: number
 *               currency:
 *                 type: string
 *               subTotal:
 *                 type: number
 *               totalPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Venta procesada exitosamente. El portafolio y balance del usuario se han actualizado.
 *       400:
 *         description: Error en la operación (por ejemplo, saldo insuficiente o cantidad inválida).
 *       404:
 *         description: Portafolio no encontrado o no hay suficiente cantidad para vender.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/operations/sell', verifyToken, operationController.sellInstrument);


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