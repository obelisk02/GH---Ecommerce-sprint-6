const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountController');

router.get('/', accountController.index);
router.get('/myproducts', accountController.myproducts);
router.get('/myproducts/new', accountController.new);//Regresa formulario de creación
router.post('/myproducts', accountController.store);
router.get('/myproducts/edit/:id/', accountController.edit);
router.patch('/myproducts/edit/:id', accountController.updateProduct);
router.delete('/myproducts/delete/:id', accountController.deleteProduct);

router.patch('/:id', accountController.updateUser);
router.delete('/:id', accountController.deleteUser);

// nuevo
module.exports = router;