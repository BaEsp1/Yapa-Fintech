const express = require('express');
const router = express.Router();

const login = require('./routes/loginRoutes');
const user = require('./routes/userRoutes');
const goal = require('./routes/goalRoutes');
const portfoil = require('./routes/portfoilRoutes');
const profile = require('./routes/financialProfileRoutes');
const balance = require('./routes/balanceRoutes');
const operation = require('./routes/operationRoutes');


router.use('/', login);
router.use('/users', user);
router.use('/goals', goal);
router.use('/portfoil', portfoil);
router.use('/profile', profile);
router.use('/balance', balance);
router.use('/operations', operation);

module.exports = router;
