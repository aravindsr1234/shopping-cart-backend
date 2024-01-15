const express = require('express');
const route = express.Router();
const controller = require('../controller/paymentController');

route.get('/', controller.find);

module.exports = route;