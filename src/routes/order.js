const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const orderController = require('../controller/order.controller');

router.use(bodyParser.json());
router.get('/getOrders', orderController.getOrders);

/**
 * @swagger
 * /getOrders:
 * get:
 *      description: use to fetch orders by customer id
 *      responses:
 *          '200':
 *              description: reponse
 */
router.get('/cost', orderController.calcAmount);
router.post('/create', orderController.createOrder);
router.patch('/update', orderController.updateOrder);
router.patch('/cancel', orderController.cancelOrder);
router.post('/list', orderController.getOrdersByRestaurant);

module.exports = router;