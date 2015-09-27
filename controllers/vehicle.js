// Load required packages
var Vehicle = require('../models/vehicle');

//GET - Return all vehicles in the DB
exports.getAllVehicles = function(req, res) {
  Vehicle.find({ userId: req.user._id }, function (err, vehicles) {
            if (err) res.send(500, err.vehicle);
            //console.log('GET /vehicle');
            res.status(200).jsonp(vehicles);
        })
};

//GET - Return a Vehicle with specified ID
exports.findVehicleById = function(req, res) {
        Vehicle.findById(req.params.vehicleId, function (err, vehicle) {
            if (err) return res.send(404, err.vehicle);
            //console.log('GET /vehicle/' + req.params.vehicleId);
            res.status(200).jsonp(vehicle);
        });
};

//POST - Insert a new Vehicle in the DB
exports.addVehicle = function(req, res) {
        //console.log('POST /vehicle/');
        //console.log(req.body);

        var vehicle = new Vehicle({
          brand: req.body.brand,
          model: req.body.model,
          year: req.body.year,
          created_at: req.body.created_at,
          userId: req.user._id
        });

        vehicle.save(function (err, vehicle) {
            if (err) return res.send(500, err.vehicle);
            res.status(201).jsonp(vehicle);
        });
    };

//PUT - Update a vehicle already exists
exports.updateVehicle = function(req, res) {

    //console.log('PUT /vehicle/' + req.params.vehicleId);

        Vehicle.findById(req.params.vehicleId, function (err, vehicle) {
          vehicle.brand = req.body.brand,
            vehicle.model = req.body.model,
            vehicle.year = req.body.year,
            vehicle.created_at = req.body.created_at,
            vehicle.created_by = req.body.created_by,

            vehicle.save(function (err) {
                if (err) return res.send(500, err.vehicle);
                res.status(200).jsonp(vehicle);
            });
        });
    };

//DELETE - Delete a Vehicle with specified ID
exports.deleteVehicle = function(req, res) {

      //console.log('DELETE /vehicle/' + req.params.vehicleId);

        Vehicle.findById(req.params.vehicleId, function (err, vehicle) {
            if(err) return res.send(404, err.vehicle);
            vehicle.remove(function (err) {
                if (err) return res.send(500, err.vehicle);
                res.status(200).end();
            })
        });
    };