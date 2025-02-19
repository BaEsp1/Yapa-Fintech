const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');
const { authenticate } = require('../middleware/authenticate'); 

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Ver el balance del usuario
 *     description: Endpoint para obtener el balance actual del usuario autenticado.
 *     responses:
 *       200:
 *         description: Balance del usuario encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/balance', authenticate, balanceController.getBalance);

/**
 * @swagger
 * /balance/withdraw:
 *   post:
 *     summary: Retirar dinero del balance
 *     description: Endpoint para realizar un retiro de dinero desde el balance del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: float
 *     responses:
 *       200:
 *         description: Retiro realizado exitosamente
 *       400:
 *         description: Error al realizar el retiro
 *       500:
 *         description: Error interno del servidor
 */
router.post('/balance/withdraw', authenticate, balanceController.withdraw);


module.exports = router;
