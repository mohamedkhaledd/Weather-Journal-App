//setting up a javascript object as endpoint for all the routes
let projectData = {};

//require the express in order to run the server and routes
const express = require('express');

const bodyParser = require('body-parser');

//starting up the instance of the app
const app = express();

//configure express in order to use the body parser as a middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());
//initializing the main project Folder
app.use(express.static('website'));

//The Post Route
const data = [];
app.post('/add', addInfo);

function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

//callBack the function so we can compelete the get /all
app.get('/all', getInfo);

function getInfo(req, res) {
  res.send(projectData);
}

//setting up the server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
};
