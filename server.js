// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride  = require("method-override");
var passport = require('passport');
var userController = require('./controllers/user');
var vehicleController = require('./controllers/vehicle');
var refuelController = require('./controllers/refuel');
var authController = require('./controllers/auth');
var config = require('./config');

// Connection to DB
var database = config.mongo.uri + config.mongo.db;
var port = config.port;
var ip = config.ip;
var options = config.dbUser;

mongoose.connect(database, options, function(err, res) {
    if(err) throw err;
    console.log('Connected to Database: ' + database);
});

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Middlewares
app.use(bodyParser.json());
app.use(methodOverride());

// Use the passport package in our application
app.use(passport.initialize());

// permit cross-origin resource sharing
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /user
router.route('/user')
  .post(userController.addUser)
  .get(authController.isAuthenticated, userController.getAllUsers)
  .delete(authController.isAuthenticated, userController.deleteUser);

//Create endpoint handlers for /user/:user_id
router.route('/user/:user_id')
  .get(authController.isAuthenticated, userController.findUserById)
  .put(authController.isAuthenticated, userController.updateUser);

//Create endpoint handlers for /user/username/:username
router.route('/user/username/:username')
  .get(userController.findUserByUsername)





// Create endpoint handlers for /vehicle
router.route('/vehicle')
  .post(authController.isAuthenticated, vehicleController.addVehicle)
  .get(authController.isAuthenticated, vehicleController.getAllVehicles)

//Create endpoint handlers for /vehicle/:vehicleId
router.route('/vehicle/:vehicleId')
  .get(authController.isAuthenticated, vehicleController.findVehicleById)
  .put(authController.isAuthenticated, vehicleController.updateVehicle)
  .delete(authController.isAuthenticated, vehicleController.deleteVehicle);





// Create endpoint handlers for /refuel
router.route('/refuel')
  .post(authController.isAuthenticated, refuelController.postRefuels)
  .get(authController.isAuthenticated, refuelController.getRefuels);

//Create endpoint handlers for /refuel/:refuel_id
router.route('/refuel/:refuel_id')
  .get(authController.isAuthenticated, refuelController.getRefuel)
  .put(authController.isAuthenticated, refuelController.putRefuel)
  .delete(authController.isAuthenticated, refuelController.deleteRefuel);

// Register all our routes with /api
app.use('/api', router);

// Start server
app.listen(port, ip, function() {
    console.log("Node server running on " + config.url);
});