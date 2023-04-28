const express = require('express');
const fishRoutes = require('/fish.js');

// require express router
const router = express.Router();

// mount fishRoutes middleware on the '/fish' path.
router.use('/fish', fishRoutes);

module.exports = router
