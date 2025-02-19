const express = require('express');
const router = express.Router();
const portfoilController = require('../controllers/portfoilController');
const { authenticate } = require('../middlewares/authenticate');

/**
 * @swagger
 * /portfoils:
 *   get:
 *     summary: Ver todos los portafolios (solo admin)
 *     description: Endpoint que permite a los administradores ver todos los portafolios de usuarios.
 *     responses:
 *       200:
 *         description: Lista de portafolios
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', authenticate, portfoilController.getAllPortfoils);

/**
 * @swagger
 * /portfoils/{id}:
 *   get:
 *     summary: Ver el portafolio de un usuario por ID
 *     description: Endpoint que permite a un usuario ver su propio portafolio.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario para obtener su portafolio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Portafolio del usuario encontrado
 *       404:
 *         description: Portafolio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', authenticate, portfoilController.getPortfoilByUserId);

/**
 * @swagger
 * /portfoils/{idPortfoil}/transaction:
 *   post:
 *     summary: Crear una transacción (compra/venta de instrumentos)
 *     description: Endpoint para crear una nueva operación de compra o venta de instrumentos en el portafolio.
 *     parameters:
 *       - in: path
 *         name: idPortfoil
 *         required: true
 *         description: ID del portafolio donde se realizará la transacción
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *                       type: float
 *               operationType:
 *                 type: string
 *                 enum: [buy, sell]
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transacción procesada exitosamente
 *       400:
 *         description: Error en la transacción
 *       500:
 *         description: Error interno del servidor
 */
router.post('/:idPortfoil/transaction', authenticate, portfoilController.createTransaction);


module.exports = router;
