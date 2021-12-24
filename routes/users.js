const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/new/', usersController.new);
router.post('/', usersController.store);

router.get('/edit/:id', usersController.edit); 
router.patch('/edit/:id', usersController.update);

router.delete('/delete/:id', usersController.delete); 


module.exports = router;