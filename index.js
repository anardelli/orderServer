/**
 * library imports
 */
require('dotenv/config');
require('./config/consul');
require('./src/notification/producer');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


console.log('enviornment', process.env.NODE_ENV);
console.log('MONGODB URL - ', process.env.MONGODB_URL);
const app = express();
app.use(bodyParser.json());

/**
 * configuration imports
 */
require('./config/database');

const swaggerUi = require("swagger-ui-express");
const swaggerDocumentation = require('./swagger.json');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));

/**
 * routers imports
 */
const order = require('./src/routes/order');
app.use('/order', order);

const PORT = process.env.PORT || 5555;
const IP_ADDRESS = process.env.IP_ADDRESS || '127.0.0.1';

mongoose.connection.once('open', () => {
    console.log('connected to database...');
    app.listen(PORT, () => {
        console.log('Restaurant Order server is running at IP, Port Number ', IP_ADDRESS, PORT);
    });
});
mongoose.connection.on('error', (error) => {
    console.log('Database Error : ', error);
});

/**
 * @swagger
 * localhost:5000:
 *  get:
 *    description: Restaurant Server home page
 *    responses:
 *      '200':
 *        description: A successful response of server starting
 */
app.get('/', (req, res) => {
    res.send('Restaurant Order Server Started process id is ' + process.pid + ' and port is ' + PORT);
});

module.exports = app;