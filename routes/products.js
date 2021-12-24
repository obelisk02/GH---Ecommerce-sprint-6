const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/detail/:id/', productsController.detail); 

router.get('/new/', productsController.new);
router.post('/', productsController.store);

router.get('/edit/:id', productsController.edit); 
router.patch('/edit/:id', productsController.update);

router.delete('/delete/:id', productsController.delete); 

module.exports = router;