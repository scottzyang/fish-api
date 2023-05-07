const express = require('express');
const router = express.Router();
const fishController = require('../controllers/fish');

// routes for environment
router.get('/', fishController.getAll);
router.get('/:id', fishController.getOne);
router.post('/', fishController.create);
router.put('/:id', fishController.update);
router.delete('/:id', fishController.delete);

module.exports = router;
