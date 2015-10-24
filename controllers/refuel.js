// Load required packages
var Refuel = require('../models/refuel');

//POST - Insert a new Refuel in the DB
exports.addRefuel = function(req, res) {
        //console.log('POST /refuel/');
        //console.log(req.body);

        var refuel = new Refuel({
          date: req.body.date,
          gas_price: req.body.gas_price,
          gas_station: req.body.gas_station,
          price_amount: req.body.price_amount,
          fuel_amount: req.body.fuel_amount,
          previous_distance: req.body.previous_distance,
          userId: req.user._id,
          vehicle: req.body.vehicle
        });

        refuel.save(function (err, refuel) {
            if (err) return res.send(500, err.refuel);
            Refuel.findOne(refuel).populate('vehicle').exec(function (err, refuel) {
            //console.log(refuel);
            res.status(201).jsonp(refuel);
            });
        });
};

//GET - Return all refuels in the DB
exports.getAllRefuels = function(req, res) {
  Refuel.find({ userId: req.user._id }, function (err, refuels) {
            if (err) res.send(500, err.refuel);
            //console.log(refuels);
            res.status(200).jsonp(refuels);
        }).populate('vehicle');
};

// Create endpoint /api/refuels/:refuel_id for GET
exports.getRefuel = function(req, res) {
  // Use the Refuel model to find a specific refuel
  Refuel.find({ userId: req.user._id, _id: req.params.refuel_id }, function(err, refuel) {
    if (err) res.send(err);
    res.json(refuel);
  });
};

//PUT - Update a register already exists
exports.updateRefuel = function(req, res) {

    //console.log('PUT /refuel/' + req.params.refuelId);

        Refuel.findById(req.params.refuelId, function (err, refuel) {
          refuel.date = req.body.date,
            refuel.gas_price = req.body.gas_price,
            refuel.price_amount = req.body.price_amount,
            refuel.fuel_amount = req.body.fuel_amount,
            refuel.previous_distance = req.body.previous_distance,
            refuel.created_at = req.body.created_at,
            refuel.created_by = req.body.created_by,
            refuel.vehicle = req.body.vehicle

            refuel.save(function (err) {
                if (err) return res.send(500, err.refuel);
                res.status(200).jsonp(refuel);
            });
        });
};


//DELETE - Delete a Refuel with specified ID
exports.deleteRefuel = function(req, res) {

      //console.log('DELETE /refuel/' + req.params.refuelId);

        Refuel.findById(req.params.refuelId, function (err, refuel) {
            if(err) return res.send(404, err.refuel);
            refuel.remove(function (err) {
                if (err) return res.send(500, err.refuel);
                res.status(200).end();
            })
        });
};