const express = require('express');
const router = express.Router();
const khaltiController = require('../controller/khaltiController');


router.post('/khalti/payment/success', khaltiController.verifyPayment);

module.exports = router;