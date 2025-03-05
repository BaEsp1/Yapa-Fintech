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
 * /:
 *   get:
 *     summary: Obtener el perfil financiero del usuario autenticado
 *     tags: [Perfil Financiero]
 *     description: Este endpoint permite obtener el perfil financiero del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil financiero encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 knowledgeLevel:
 *                   type: string
 *                 riskProfile:
 *                   type: string
 *                 incomeMonthly:
 *                   type: number
 *                 expensesMonthly:
 *                   type: number
 *                 percentageSave:
 *                   type: number
 *                 totalDebt:
 *                   type: number
 *       404:
 *         description: Perfil financiero no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', verifyToken, financialProfileController.getFinancialProfile);

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Obtener todos los perfiles financieros (solo para administradores)
 *     tags: [Perfil Financiero]
 *     description: Este endpoint permite obtener todos los perfiles financieros de los usuarios (solo accesible para administradores).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de perfiles financieros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   knowledgeLevel:
 *                     type: string
 *                   riskProfile:
 *                     type: string
 *                   incomeMonthly:
 *                     type: number
 *                   expensesMonthly:
 *                     type: number
 *                   percentageSave:
 *                     type: number
 *                   totalDebt:
 *                     type: number
 *       404:
 *         description: No se encontraron perfiles financieros
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
 *     description: Este endpoint permite modificar el perfil financiero del usuario autenticado.
 *     security:
 *       - bearerAuth: []
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
 *                 type: number
 *               expensesMonthly:
 *                 type: number
 *               percentageSave:
 *                 type: number
 *               totalDebt:
 *                 type: number
 *     responses:
 *       200:
 *         description: Perfil financiero actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 profile:
 *                   type: object
 *                   properties:
 *                     knowledgeLevel:
 *                       type: string
 *                     riskProfile:
 *                       type: string
 *                     incomeMonthly:
 *                       type: number
 *                     expensesMonthly:
 *                       type: number
 *                     percentageSave:
 *                       type: number
 *                     totalDebt:
 *                       type: number
 *       400:
 *         description: Error al actualizar el perfil (datos inválidos o incompletos)
 *       404:
 *         description: Perfil financiero no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.put('/profile', verifyToken, financialProfileController.updateFinancialProfile);

module.exports = router;
