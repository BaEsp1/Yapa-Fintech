const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceControllers');
const { verifyToken } = require('../middlewares/authenticate'); 


/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: Endpoints relacionados con los moviento de dinero del usuario
 */

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Obtener el balance del usuario
 *     tags: ["Balance"]
 *     description: Este endpoint permite obtener el balance actual del usuario autenticado, incluyendo el balance depositado, ahorrado e invertido.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance del usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deposited:
 *                   type: number
 *                 saved:
 *                   type: number
 *                 invested:
 *                   type: number
 *                 totalBalance:
 *                   type: number
 *       404:
 *         description: Balance no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', verifyToken, balanceController.getBalance);

/**
 * @swagger
 * /balance/withdraw:
 *   post:
 *     summary: Retirar dinero del balance
 *     tags: ["Balance"]
 *     description: Este endpoint permite realizar un retiro de dinero desde el balance del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Monto a retirar
 *     responses:
 *       200:
 *         description: Retiro realizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 balance:
 *                   type: object
 *                   properties:
 *                     deposited:
 *                       type: number
 *                     saved:
 *                       type: number
 *                     invested:
 *                       type: number
 *                     totalBalance:
 *                       type: number
 *       400:
 *         description: Saldo insuficiente para realizar el retiro
 *       404:
 *         description: Balance no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.post('/balance/withdraw', verifyToken, balanceController.withdraw);

module.exports = router;
