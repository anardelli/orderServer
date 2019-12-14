const mongoose = require('mongoose');
const dish = require('./dish.schema.js');

const orderModel = mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    dishes: [dish],
    orderedTime: {
        type: String,
        required: true
    },
    total_amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    cancelStatus: {
        type: String,
        default: false
    }
});

module.exports = mongoose.model('orders', orderModel);