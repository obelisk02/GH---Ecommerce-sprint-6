const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.index);

module.exports = router;