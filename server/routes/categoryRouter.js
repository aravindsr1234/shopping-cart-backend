const express = require('express');
const route = express.Router();
const controller = require('../controller/categoryController');
const multer = require('multer');
const storage = require('../functions/multer');

const upload = multer({ storage: storage});

route.get('/', controller.find);
route.post('/', upload.single('image'),controller.create);

module.exports = route ;

