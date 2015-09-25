// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var refuelController = require('./controllers/refuel');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// Connect to myFuelCloud MongoDB
mongoose.connect('mongodb://localhost:27017/myFuelCloud');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /refuels
router.route('/refuels')
  .post(authController.isAuthenticated, refuelController.postRefuels)
  .get(authController.isAuthenticated, refuelController.getRefuels);

//Create endpoint handlers for /refuels/:refuel_id
router.route('/refuels/:refuel_id')
  .get(authController.isAuthenticated, refuelController.getRefuel)
  .put(authController.isAuthenticated, refuelController.putRefuel)
  .delete(authController.isAuthenticated, refuelController.deleteRefuel);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);