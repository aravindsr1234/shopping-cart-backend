const express = require('express');
const route = express.Router();
const controller = require('../controller/categoryController');

route.get('/', controller.find);
route.post('/', controller.create);

module.exports = route ;

