const mongoose = require('mongoose');
const config = require('./config');
console.log('Trying to connect with mongoDB database...');
mongoose.connect(config.mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
