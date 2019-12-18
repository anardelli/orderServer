const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const orderController = require('../controller/order.controller');

router.use(bodyParser.json());
router.get('/getOrders', orderController.getOrders);

router.get('/cost', orderController.calcAmount);
router.post('/create', orderController.createOrder);
router.patch('/update', orderController.updateOrder);
router.patch('/cancel', orderController.cancelOrder);
router.post('/list', orderController.getOrdersByRestaurant);

module.exports = router;