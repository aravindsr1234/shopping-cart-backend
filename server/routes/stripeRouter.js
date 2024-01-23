const express = require('express');
const route = express.Router();
const controller = require('../controller/stripeController');

route.post('/', controller.create);
route.put('/', controller.update);

module.exports = route;