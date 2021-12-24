const express = require('express');
const router = express.Router();

const productsController = require('../controllers/sectionsController');

router.get('/:id/', productsController.section);
router.get('/:id/:ft/:filter/', productsController.filterSection);

module.exports = router;