const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require("./routes/NoteRoutes")

const DB_URL = ''
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'labs'
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.use("/", noteRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Welcome to the Note taking application - Week 6 Exercise</h1>");
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});