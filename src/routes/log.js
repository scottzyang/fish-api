const express = require('express');
const router = express.Router();
const logController = require('../controllers/log');

// routes for environment
router.get('/', logController.getAll);
router.get('/:id', logController.getOne);
router.post('/', logController.create);
router.put('/:id', logController.update);
router.delete('/:id', logController.delete);

module.exports = router;
