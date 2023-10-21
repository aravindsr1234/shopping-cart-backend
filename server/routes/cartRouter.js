const express = require('express');
const router = express.Router();
const controller = require('../controller/cartController')

router.get('/', controller.find);
router.post('/', controller.createItemToCart);
// router.put('/', controller.update);
router.delete('/', controller.deleteFromCart);

module.exports = router;

