const express = require("express");
const app = express();
const PORT = 5000
const mongoose = require("mongoose");
const {connectQueues} = require('./queue/queue')
const Instructor = require('./Model/Instructor')


app.use(express.json());
mongoose.connect(
    "mongodb://localhost/instructor-rabbitmq-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log(`Instructor-Service DB Connected`);
    }
);


//connectQueues(["COURSE"])

async function addCourse({name,description,instructorId }){
    const instructor = await Instructor.findById(instructorId)
    await instructor.courses.push({name,description})
    instructor.save()
    console.log("course added to instructor")
}

connectQueues(["COURSE"]).then(() => {
    channel.consume("COURSE", (data) => {
        console.log("Consuming COURSE service");
        const {name,description,instructorId } = JSON.parse(data.content);
        
       addCourse({name,description,instructorId })
        
        channel.ack(data);
        /*channel.sendToQueue(
            "PRODUCT",
            Buffer.from(JSON.stringify({ newOrder }))
        );*/
    });
});;


//Add Instructor
app.post("/instructor", async (req, res) => {
    const { name } = req.body;
    const newInstructor = new Instructor({
        name,
    });
    newInstructor.save();
    return res.json(newInstructor);
});




app.listen(PORT, () => {
    console.log(`Instructor-Service at ${PORT}`);
});