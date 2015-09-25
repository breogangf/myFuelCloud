// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var refuelController = require('./controllers/refuel');

// Connect to myFuelCloud MongoDB
mongoose.connect('mongodb://localhost:27017/myFuelCloud');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /refuels
router.route('/refuels')
  .post(refuelController.postRefuels)
  .get(refuelController.getRefuels);

//Create endpoint handlers for /refuels/:refuel_id
router.route('/refuels/:refuel_id')
  .get(refuelController.getRefuel)
  .put(refuelController.putRefuel)
  .delete(refuelController.deleteRefuel);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);