const express = require('express');
const route = express.Router();

route.get('/', controller.find);
route.post('/', controller.create);
route.put('/', controller.update);
route.delete('/', controller.delete);