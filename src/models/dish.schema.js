const mongoose = require('mongoose');

const dish = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    }
});

module.exports = dish;