const express = require('express');
const router = express.Router();
const environmentController = require('../controllers/environment');

// routes for environment
router.get('/', environmentController.getAll);
router.get('/:id', environmentController.getOne);
router.post('/', environmentController.create);
router.put('/:id', environmentController.update);
router.delete('/:id', environmentController.delete);

module.exports = router;
