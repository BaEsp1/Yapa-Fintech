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
 *     summary: Ver el balance del usuario
 *     tags: ["Balance"]
 *     security:
 *     - bearerAuth: []
 *     description: Endpoint para obtener el balance actual del usuario autenticado.
 *     responses:
 *       200:
 *         description: Balance del usuario encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/balance', verifyToken, balanceController.getBalance);

/**
 * @swagger
 * /balance/withdraw:
 *   post:
 *     summary: Retirar dinero del balance
 *     tags: ["Balance"]
 *     security:
 *     - bearerAuth: []
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
router.post('/balance/withdraw', verifyToken, balanceController.withdraw);


module.exports = router;
