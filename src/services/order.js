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
    return new Promise((resolve, reject) => {
        orderSchema.aggregate(
            [
                { $match: { orderId: req.orderId } },
                { $unwind: "$dishes" },
                {
                    $project:
                    {
                        averageCost: { $avg: "$dishes.price" }
                    }
                }
            ]
        ).then((data) => {
            console.log(data);
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports = {
    createOrder,
    updateOrder,
    cancelOrder,
    getOrders,
    calcAmount
};