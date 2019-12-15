/**
 * library imports
 */
require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

console.log('enviornment', process.env.NODE_ENV);
console.log('MONGODB URL - ', process.env.MONGODB_URL);

/**
 * configuration imports
 */
const config = require('./config/config');
const database = require('./config/database');

const app = express();
app.use(bodyParser.json());

/**
 * routers imports
 */
const order = require('./src/routes/order');
app.use('/order', order);

mongoose.connection.once('open', () => {
    console.log('connected to database...');
    app.listen(config.port, () => {
        console.log('Restaurant Order server is running at port ', config.port);
    });
});
mongoose.connection.on('error', (error) => {
    console.log('Database Error : ', error);
});

app.get('/', (req, res) => {
    res.send('Restaurant Order Server Started');
});

module.exports = app;