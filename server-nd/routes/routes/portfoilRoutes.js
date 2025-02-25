const express = require('express');
const router = express.Router();
const portfoilControllers = require('../controllers/portfoilControllers');
const { verifyToken } = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Portafolios
 *   description: Endpoints para la gestión de portafolios de inversión
 */

/**
 * @swagger
 * /portfoil:
 *   get:
 *     summary: Ver todos los portafolios (solo admin)
 *     tags: [Portafolios]
 *     security:
 *       - bearerAuth: []
 *     description: Permite a los administradores ver todos los portafolios de los usuarios.
 *     responses:
 *       200:
 *         description: Lista de portafolios obtenida exitosamente
 *       403:
 *         description: No tienes permisos para ver esta información
 *       404:
 *         description: No se encontraron portafolios
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', verifyToken, portfoilControllers.getAllPortfoils);

/**
 * @swagger
 * /portfoil/{id}:
 *   get:
 *     summary: Ver el portafolio de un usuario por ID
 *     tags: [Portafolios]
 *     security:
 *       - bearerAuth: []
 *     description: Obtiene el portafolio de un usuario en base a su ID. Solo el usuario o un admin pueden acceder.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario cuyo portafolio se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Portafolio encontrado exitosamente
 *       403:
 *         description: No tienes permisos para acceder a este portafolio
 *       404:
 *         description: Portafolio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id',
     verifyToken,
      portfoilControllers.getPortfoilByUserId);

/**
 * @swagger
 * /portfoil/{id}:
 *   put:
 *     summary: Actualizar un portafolio
 *     tags: [Portafolios]
 *     security:
 *       - bearerAuth: []
 *     description: Permite actualizar un portafolio agregando o modificando instrumentos. Solo el usuario dueño o un administrador pueden hacerlo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del portafolio que se desea actualizar
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
 *                       type: number
 *     responses:
 *       200:
 *         description: Portafolio actualizado exitosamente
 *       403:
 *         description: No tienes permisos para actualizar este portafolio
 *       404:
 *         description: Portafolio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', verifyToken, portfoilControllers.updatePortfoil);

module.exports = router;
