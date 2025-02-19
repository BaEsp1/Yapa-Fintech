const express = require('express');
const router = express.Router();

const login = require('./loginRoutes');
const user = require('./userRoutes');
const goal = require('./goalRoutes');
const portfoil = require('./portfoilRoutes');
const profile = require('./profileRoutes');
const balance = require('./balanceRoutes');
const operation = require('./operationRoutes');


router.use('/', login);
router.use('/user', user);
router.use('/goal', goal);
router.use('/portfoil', portfoil);
router.use('/profile', profile);
router.use('/balance', balance);
router.use('/operation', operation);

module.exports = router;
