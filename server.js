// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
//dependencies
const cors = require('cors');
const bodyParser = require('body-parser');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//Post Route
const data = [];
app.post('/add', addInfo);

function addInfo(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['name'] =req.body.name;
  projectData['min'] = req.body.min;
  projectData['max'] = req.body.max;
//   projectData['content'] = req.body.content;
  projectData['icon'] = req.body.icon;
  res.send(projectData);
};

//Callback function to complete GET '/all'
app.get('/all', getInfo);

function getInfo(req,res){
    res.send(projectData);
}

// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{
    console.log(`Server running on local host: ${port}`)
});
