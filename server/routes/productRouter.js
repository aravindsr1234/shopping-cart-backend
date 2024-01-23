const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');
const multer = require('multer');
const storage = require('../functions/multer');

const upload = multer({ storage: storage });

router.get('/', controller.find);
router.get('/:categoryId', controller.findByCategoryId);
router.post('/', upload.array('files', 5), controller.create);
router.put('/', upload.array('files', 5), controller.update);
router.delete('/', controller.delete);

module.exports = router;