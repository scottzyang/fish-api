const express = require('express');
const fishRoutes = require('./fish.js');
const familyRoutes = require('./family.js');
const environmentRoutes = require('./environment.js')
const logRoutes = require('./log.js')

// require express router
const router = express.Router();

// mount
router.use('/fish/freshwater/families', familyRoutes);
router.use('/fish/freshwater/environments', environmentRoutes);
router.use('/fish/freshwater/log', logRoutes);
router.use('/fish/freshwater', fishRoutes);

module.exports = router
