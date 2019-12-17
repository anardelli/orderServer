require('dotenv/config');
const Bluebird = require('bluebird');

function fromCallback(fn) {
    return new Bluebird(function (resolve, reject) {
        try {
            return fn(function (err, data, res) {
                if (err) {
                    err.res = res;
                    return reject(err);
                }
                return resolve([data, res]);
            });
        } catch (err) {
            return reject(err);
        }
    });
}
const consul = require('consul')({
    promisify: fromCallback,
    host: '172.21.131.161'
});


consul.acl.bootstrap(function (err, result) {
    console.log(err, result)
    // if (err) throw err;
});


consul.agent.members(function (err, result) {
    console.log('memebrs', err, result)
    if (err) throw err;
});

const PORT = +process.env.PORT;
const IP_ADDRESS = '127.0.0.1';

const CONSUL_ID = require('uuid').v4();

let details = {
    name: 'orderService', // service group name search or order
    address: IP_ADDRESS,
    port: PORT,
    id: CONSUL_ID,
    check: {
        ttl: '10s',
        deregister_critical_service_after: '1m'
    }
};

consul.agent.service.register(details, err => {
    // schedule heartbeat
    console.log("register ", err)
});

setInterval(() => {
    consul.agent.check.pass({ id: `service:${CONSUL_ID}` }, err => {
        if (err) {
            console.log('health report failed ', err);
        } else
            console.log('told Consul that we are healthy');
    });
}, 5 * 1000);

process.on('SIGINT', () => {
    console.log('SIGINT. De-Registering...');
    let details = { id: CONSUL_ID };

    consul.agent.service.deregister(details, (err) => {
        console.log('de-registered.', err);
        process.exit();
    });
});