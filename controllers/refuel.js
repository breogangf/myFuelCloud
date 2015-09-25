// Load required packages
var Refuel = require('../models/refuel');

// Create endpoint /api/refuels for POSTS
exports.postRefuels = function(req, res) {
  // Create a new instance of the Refuel model
  var refuel = new Refuel();

  // Set the refuel properties that came from the POST data
  refuel.date = req.body.date;
  refuel.gas_price = req.body.gas_price;
  refuel.gas_station = req.body.gas_station;
  refuel.price_amount = req.body.price_amount;
  refuel.fuel_amount = req.body.fuel_amount;
  refuel.previous_distance = req.body.previous_distance;

  // Save the refuel and check for errors
  refuel.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Refuel added to the system!', data: refuel });
  });
};

// Create endpoint /api/refuels for GET
exports.getRefuels = function(req, res) {
  // Use the Refuel model to find all refuel
  Refuel.find(function(err, refuels) {
    if (err)
      res.send(err);

    res.json(refuels);
  });
};

// Create endpoint /api/refuels/:refuel_id for GET
exports.getRefuel = function(req, res) {
  // Use the Refuel model to find a specific refuel
  Refuel.findById(req.params.refuel_id, function(err, refuel) {
    if (err)
      res.send(err);

    res.json(refuel);
  });
};

// Create endpoint /api/refuels/:refuel_id for PUT
exports.putRefuel = function(req, res) {
  // Use the Refuel model to find a specific refuel
  Refuel.findById(req.params.refuel_id, function(err, refuel) {
    if (err)
      res.send(err);

    // Update the existing refuel
    refuel.date = req.body.date;
    refuel.gas_price = req.body.gas_price;
    refuel.gas_station = req.body.gas_station;
    refuel.price_amount = req.body.price_amount;
    refuel.fuel_amount = req.body.fuel_amount;
    refuel.previous_distance = req.body.previous_distance;

    // Save the refuel and check for errors
    refuel.save(function(err) {
      if (err)
        res.send(err);

      res.json(refuel);
    });
  });
};

// Create endpoint /api/refuels/:refuel_id for DELETE
exports.deleteRefuel = function(req, res) {
  // Use the Refuel model to find a specific refuel and remove it
  Refuel.findByIdAndRemove(req.params.refuel_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Refuel removed from the system!' });
  });
};