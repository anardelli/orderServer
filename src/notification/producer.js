const queueName = 'Deepanshu';

// AMQP PORT 5672

// amqp://user:pass@host.com/vhost
// amqp://localhost

// amqp://mindtree:mindtree@mt.nodesense.ai
let notificationChannel;
const open = require('amqplib').connect('amqp://test:test@mt.nodesense.ai');

// Publisher
open.then(function (connection) {
  return connection.createChannel();
}).then(function (channel) {
  notificationChannel = channel;
  return channel.assertQueue(queueName).then(function (ok) {
    return channel.sendToQueue(queueName, Buffer.from('something to do'));
  });
}).catch(console.warn);

function sendOrderDetails(details) {
  console.log('Sending a message to rabbitMQ');
  if (details && notificationChannel) {
    const message = {
      provider: 'OrderService',
      date: new Date(),
      details: details
    }
    notificationChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  } else if (notificationChannel) {
    notificationChannel.sendToQueue(queueName, Buffer.from('some error occured'));
  }
}

module.exports = sendOrderDetails;