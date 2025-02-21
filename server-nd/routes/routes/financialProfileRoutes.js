const express = require('express');
const router = express.Router();
const financialProfileController = require('../controllers/financialProfileControllers');
const {verifyToken , verifyAdmin}= require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Perfil Financiero
 *   description: Endpoints del perfil financiero del usuario
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Ver el perfil financiero del usuario autenticado
 *     tags: [Perfil Financiero]
 *     description: Endpoint para obtener el perfil financiero de un usuario autenticado.
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil financiero encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/profile', verifyToken, financialProfileController.getFinancialProfile);

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Ver todos los perfiles financieros (solo para administradores)
 *     tags: [Perfil Financiero]
 *     security:
 *     - bearerAuth: []
 *     description: Endpoint para obtener todos los perfiles financieros de los usuarios (solo accesible para administradores).
 *     responses:
 *       200:
 *         description: Lista de perfiles financieros
 *       500:
 *         description: Error interno del servidor
 */
router.get('/profiles' , verifyToken,verifyAdmin, financialProfileController.getAllFinancialProfiles);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Modificar el perfil financiero del usuario autenticado
 *     tags: [Perfil Financiero]
 *     security:
 *     - bearerAuth: []
 *     description: Endpoint para modificar el perfil financiero del usuario autenticado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               knowledgeLevel:
 *                 type: string
 *               riskProfile:
 *                 type: string
 *               incomeMonthly:
 *                 type: float
 *               expensesMonthly:
 *                 type: float
 *               percentageSave:
 *                 type: float
 *               totalDebt:
 *                 type: float
 *     responses:
 *       200:
 *         description: Perfil financiero actualizado exitosamente
 *       400:
 *         description: Error al actualizar el perfil
 *       500:
 *         description: Error interno del servidor
 */
router.put('/profile', verifyToken, financialProfileController.updateFinancialProfile);

module.exports = router;
