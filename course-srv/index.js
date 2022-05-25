const express = require("express");
const app = express();
const PORT = 5001
const mongoose = require("mongoose");
//const amqp = require("amqplib");
const Course = require("./Model/Course")
const {connectQueues,sendtoQueue }= require("./queue/queue")

app.use(express.json());
mongoose.connect(
    "mongodb://localhost/course-rabbitmq-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log(`Course-Service DB Connected`);
    }
);

/*async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("COURSE")
    await channel.assertQueue("srv3:COURSE");
}*/
connectQueues(["COURSE","srv3:COURSE"]);


//Add course----------------------------------------------
app.post("/course", async (req, res) => {
    const { name, description, instructorId } = req.body;
    const newCourse = new Course({
        name,
        description,
        instructorId,
    });
    newCourse.save();
   sendtoQueue("srv3:COURSE", {name,description,instructorId})
   sendtoQueue("COURSE", {name,description,instructorId})

 
    return res.json(newCourse);
});
/*-----------------------------------------------------------------------------------*/

app.listen(PORT, () => {
    console.log(`Course-Service at ${PORT}`);
});