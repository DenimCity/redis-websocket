const express = require('express');
const { basketController } = require('../controller');

const router = express.Router();

// Basket Routes
router.get('/basket/getOneBasket/', basketController.getBasketsById);
router.get('/basket/getBaskets', basketController.allBaskets);
router.post('/basket/addItem', basketController.addBasket);

module.exports = router;
