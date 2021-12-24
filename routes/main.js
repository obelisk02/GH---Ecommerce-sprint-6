const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');



router.get('/', routesController.index);
router.get('/login', routesController.login);
router.post('/login',  routesController.isUser);
router.get('/register', routesController.register);
router.post('/register', routesController.saveUser);

router.get('/logout', routesController.logout);

module.exports = router;