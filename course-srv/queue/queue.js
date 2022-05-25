const amqp = require("amqplib");

async function connectQueues(queues) {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();

    queues.forEach(async queue => {
      await channel.assertQueue(queue)  
    });

}
function sendtoQueue(queue,data){
  channel.sendToQueue(queue, Buffer.from( JSON.stringify(data))
)  
}


module.exports = {connectQueues,sendtoQueue};