require('dotenv').config();
const express = require("express"),
       app = express(),
       port = process.env.PORT || 3001,
       cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Data = require('./taskModel'); // Importing the model once
const fs = require("fs").promises;

app.use(cors());
app.use(bodyParser.json({ extended: true }));

if (process.env.USE_MONGODB === 'true') {
    console.log('Using MongoDB');
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

app.listen(port, () => console.log("Backend server live on " + port));

app.get("/", (req, res) => {
    res.send({ message: "Connected to Backend server!" });
});

app.post("/add/item", addItem)

async function addItem (request, response) {
    try {
        // Converting Javascript object (Task Item) to a JSON string
        const id = request.body.jsonObject.id
        const task = request.body.jsonObject.task
        const curDate = request.body.jsonObject.currentDate
        const dueDate = request.body.jsonObject.dueDate
        const newTask = {
          ID: id,
          Task: task,
          Current_date: curDate,
          Due_date: dueDate
        }

        if (process.env.USE_MONGODB === 'true') {
            console.log('Using MongoDB');

            // Insert JSON data into MongoDB
            const docs = await Data.create(newTask);
            console.log('Successfully wrote to MongoDB', docs);
            response.sendStatus(200);

        } else {
            console.log('Using JSON file');
            const data = await fs.readFile("database.json");
            const json = JSON.parse(data);
            json.push(newTask);
            await fs.writeFile("database.json", JSON.stringify(json))
            console.log('Successfully wrote to file') 
            response.sendStatus(200)
        }

    } catch (err) {
        console.log("error: ", err)
        response.sendStatus(500)
    }
}

