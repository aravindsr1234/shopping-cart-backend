const express = require('express');
const route = express.Router();
const verifyUser = require('../functions/verify-user')
const controller = require('../controller/userController');

route.get('/', controller.find);
route.post('/', controller.create);
route.post('/login', controller.login);
route.delete('/', controller.delete);
route.put('/', controller.update);

module.exports = route;

