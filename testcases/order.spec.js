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
* Test the /order route
*/
describe('Restaurant', () => {
    // beforeEach((done) => { //Before each test we empty the database
    //     // OrderModel.remove({}, (err) => {
    //     //     done();
    //     // });
    // });
    describe('/order', () => {
        const orderID = Math.random() * 10000;
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
            "total_amount": "78",
            "status": "placed",
            "restaurantId": "16774318",
            "customerId": "12235",
            "orderId": orderID
        };
        let updateOrderBody = {
            "dishes": [
                {
                    "name": "Tatarák ze sumce s toustem",
                    "price": "43$"
                }
            ],
            "total_amount": "43$",
            "orderId": "123343"
        };
        it('it should GET all the order of customers', (done) => {
            chai.request(app)
                .get('/order/getOrders?customerId=125')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('should call post call to save the order', (done) => {
            chai.request(app)
                .post('/order/create')
                .send(order)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('should call post call to update the order', (done) => {
            chai.request(app)
                .post('/order/update')
                .send(updateOrderBody)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        it('should call post call to cancel the order', (done) => {
            chai.request(app)
                .post('/order/cancel')
                .send({ "orderId": "123343" })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});