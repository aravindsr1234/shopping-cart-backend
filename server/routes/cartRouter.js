const express = require('express');
const router = express.Router();
const controller = require('../controller/cartController')

router.get('/', controller.find);
router.get('/cartById', controller.findByUserId);
router.post('/createCart', controller.createItemToCart);
// router.put('/', controller.update);
router.delete('/', controller.deleteFromCart);
router.delete('/deleteAll', controller.deleteAllDataFromCart)

module.exports = router;

