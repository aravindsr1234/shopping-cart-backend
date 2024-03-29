const express = require('express');
const router = express.Router();
const controller = require('../controller/orderController');

router.get('/', controller.find);
router.get('/search', controller.search);
router.get('/orderById', controller.findById);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.delete);

module.exports = router;