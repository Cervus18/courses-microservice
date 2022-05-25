const express = require("express");
const app = express();
const PORT = 5002
const amqp = require("amqplib");



app.use(express.json());

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("srv3:COURSE");
}



connect().then(() => {
    channel.consume("srv3:COURSE", (data) => {
        console.log("Srv-3 Consuming COURSE service");
        const {name,description,instructorId } = JSON.parse(data.content);
        console.log(`Course name: ${name}`)
        

        
        channel.ack(data);
        /*channel.sendToQueue(
            "PRODUCT",
            Buffer.from(JSON.stringify({ newOrder }))
        );*/
    });
});;






app.listen(PORT, () => {
    console.log(`Service-3 at ${PORT}`);
});