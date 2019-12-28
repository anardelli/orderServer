const orderSchema = require('../models/order.schema');

function createOrder(req) {
    return new Promise((resolve, reject) => {
        const order = new orderSchema(req);
        order.save((err, insertedData) => {
            if (!err) {
                console.log('insertedData', insertedData);
                resolve(insertedData);
            } else {
                reject(err);
            }
        });
    });
}

function cancelOrder(req) {
    return new Promise((resolve, reject) => {
        orderSchema.findOneAndUpdate(
            { 'orderId': req.orderId },
            {
                $set: {
                    'cancelStatus': true
                }
            },
            { upsert: true },
            (error, data) => {
                if (!error) {
                    console.log('insertedData', data);
                    data.cancelStatus = true;
                    resolve(data);
                } else {
                    reject(error);
                }
            }
        )
    })
}

function updateOrder(req) {
    return new Promise((resolve, reject) => {
        orderSchema.findOneAndUpdate(
            { 'orderId': req.orderId },
            {
                $set: {
                    'dishes': req.dishes,
                    'total_amount': req.total_amount
                }
            },
            { upsert: true },
            (error, data) => {
                if (!error) {
                    console.log('insertedData', data);
                    resolve(data);
                } else {
                    reject(error);
                }
            }
        )
    });
}

function getOrders(req) {
    return new Promise((resolve, reject) => {
        orderSchema.find({ customerId: req.customerId }).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}

function calcAmount(req) {
    console.log('req', req);
    return new Promise((resolve, reject) => {
        orderSchema.aggregate(
            [
                { $match: { orderId: req.orderId } },
                { $unwind: "$dishes" },
                {
                    $group: {
                        _id: "$_id",
                        sum: { $sum: "$dishes.price" }
                    }
                }
            ]
        ).then((data) => {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}

function getOrdersByRestaurant(req) {
    const date = new Date(req.date);
    const nextDate = new Date(date.getTime() + 86400000);
    return new Promise((resolve, reject) => {
        orderSchema.find(
            {
                restaurantId: { $in: req.restaurants },
                orderedTime: { $gte: date, $lt: nextDate }
            }
        ).then((data) => {
            resolve(data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

module.exports = {
    createOrder,
    updateOrder,
    cancelOrder,
    getOrders,
    calcAmount,
    getOrdersByRestaurant
};