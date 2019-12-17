const Response = require('../response');
const orderService = require('../services/order');
const notificationService = require('../notification/producer');

function getOrders(req,res) {
    const response = new Response();
    console.log('query...', req.query);
    orderService.getOrders(req.query).
        then((result) => {
            response.data.result = result;
            response.status.statusCode = 200;
            response.status.message = "recieved all the orders succesfully !";
            res.status(200).json(response);
        }).catch((err) => {
            response.status.statusCode = '500';
            response.status.message = "Unable to get all the order!";
            res.status(500).json(response);
        });
}

function createOrder(req, res) {
    const response = new Response();
    console.log('body...', req.body);
    orderService.createOrder(req.body).
        then((result) => {
            response.data.result = result;
            response.status.statusCode = 200;
            response.status.message = "Order created succesfully !";
            notificationService(result);
            res.status(200).json(response);
        }).catch((err) => {
            notificationService(err);
            response.status.statusCode = '500';
            response.status.message = "unable to create order";
            res.status(500).json(response);
        });
}

function updateOrder(req, res) {
    const response = new Response();
    console.log('body...', req.body);
    orderService.updateOrder(req.body).
        then((result) => {
            response.data.result = result;
            response.status.statusCode = 200;
            response.status.message = "Order updated succesfully !";
            res.status(200).json(response);
        }).catch((err) => {
            response.status.statusCode = '500';
            response.status.message = "Unable to update the order!";
            res.status(500).json(response);
        });
}

function cancelOrder(req, res) {
    const response = new Response();
    console.log('body...', req.body);
    orderService.cancelOrder(req.body).
        then((result) => {
            response.data.result = result;
            response.status.statusCode = 200;
            response.status.message = "Order canceled succesfully !";
            res.status(200).json(response);
        }).catch((err) => {
            response.status.statusCode = '500';
            response.status.message = "Unable to cancel the order!";
            res.status(500).json(response);
        });
}

function calcAmount(req,res) {
    const response = new Response();
    console.log('query...', req.query);
    orderService.calcAmount(req.query).
        then((result) => {
            response.data.result = result;
            response.status.statusCode = 200;
            response.status.message = "Average amount calculated succesfully !";
            res.status(200).json(response);
        }).catch((err) => {
            response.status.statusCode = '500';
            response.status.message = "Unable to calculate order amount!";
            res.status(500).json(response);
        });
}

function getOrdersByRestaurant(req, res) {
    const response = new Response();
    console.log('body...', req.body);
    orderService.getOrdersByRestaurant(req.body).
        then((result) => {
            response.data.result = result;
            response.status.statusCode = 200;
            response.status.message = "Orders Fetched succesfully !";
            res.status(200).json(response);
        }).catch((err) => {
            response.status.statusCode = '500';
            response.status.message = "Unable to fetch orders!";
            res.status(500).json(response);
        });
}

module.exports = {
    createOrder,
    updateOrder,
    cancelOrder,
    calcAmount,
    getOrders,
    getOrdersByRestaurant
};
