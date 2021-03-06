const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController')

router.post('/', controller.post);
router.get('/', controller.get);
router.put('/:id', controller.put);
router.delete('/:id',controller.delete);
router.get('/:id/plots/:plotValues', controller.getPlotValue);

module.exports = router;