const amqplib = require('amqplib/callback_api');
const queue = 'tasks';

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  // Listener
  conn.createChannel((err, ch2) => {
    if (err) throw err;

    ch2.assertQueue(queue);

    ch2.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch2.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  });

});