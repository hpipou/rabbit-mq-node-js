const amqplib = require('amqplib/callback_api');
const queue = 'tasks';
var numMSG = 0;

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  // Sender
  conn.createChannel((err, ch1) => {
    if (err) throw err;

    ch1.assertQueue(queue);

    setInterval(() => {
        numMSG++;
        ch1.sendToQueue(queue, Buffer.from('MESSAGE N° ' + numMSG));
    }, 100);
  });

});