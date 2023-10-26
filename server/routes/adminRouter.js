const express = require('express');
const router = express.Router();
const controller = require('../controller/adminController');
const verifyAdmin = require('../functions/verify-admin');

router.get('/',verifyAdmin, controller.find);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.put('/', controller.update);
router.delete('/', controller.delete);

module.exports = router;