const express = require('express');
const router = express.Router();

const ownerRoutes = require('./ownerRoutes');
const petRoutes = require('./petRoutes');

router.use('/owners', ownerRoutes);
router.use('/pets', petRoutes);

module.exports = router;
