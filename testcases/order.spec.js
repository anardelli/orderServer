process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
var sinon = require('sinon');
var sinonTest = require('sinon-test');
var test = sinonTest(sinon);
import app from '../index';

require('../src/models/order.schema');
let OrderModel = mongoose.model("orders");

let should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

/*
* Test the /GET route
*/
describe('/GET /order/getOrders', () => {
    let order = {
        "cancelStatus": "false",
        "dishes": [
            {
                "name": "Tatarák ze sumce s toustem",
                "price": "34"
            },
            {
                "name": "toustem",
                "price": "44"
            }
        ],
        "orderedTime": "1:30 PM",
        "total_amount": "78",
        "status": "placed",
        "restaurantId": "16774318",
        "customerId": "125",
        "orderId": "1233"
    };
    it('it should GET all the order of customers', (done) => {
        chai.request(app)
            .get('/order/getOrders?customerId=125')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.result.length.should.be.eql(2);
                done();
            });
    });
    it('should call post call to save the order', (done) => {
        chai.request(app)
            .post('/order/create')
            .send(order)
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                done();
            });
    });
});