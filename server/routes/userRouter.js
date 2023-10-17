const express = require('express');
const route = express.Router();
const controller = require('../controller/userController');

route.get('/', controller.find);
route.post('/', controller.create);
// route.delete('/', controller.delete);
route.put('/', controller.update);

module.exports = route;

