// Load required packages
var Refuel = require('../models/refuel');

// Create endpoint /api/refuels for POST
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
  refuel.userId = req.user._id;

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
  Refuel.find({ userId: req.user._id }, function(err, refuels) {
    if (err)
      res.send(err);

    res.json(refuels);
  });
};

// Create endpoint /api/refuels/:refuel_id for GET
exports.getRefuel = function(req, res) {
  // Use the Refuel model to find a specific refuel
  Refuel.find({ userId: req.user._id, _id: req.params.refuel_id }, function(err, refuel) {
    if (err)
      res.send(err);

    res.json(refuel);
  });
};

// Create endpoint /api/refuels/:refuel_id for PUT
exports.putRefuel = function(req, res) {
  // Use the Refuel model to find a specific refuel
  Refuel.update({ userId: req.user._id, _id: req.params.refuel_id }, 
    { datedate: req.body.datedate,
      gas_price: req.body.gas_price,
      gas_station: req.body.gas_station,
      price_amount: req.body.price_amount,
      fuel_amount: req.body.fuel_amount,
      previous_distance: req.body.previous_distance,
     }, 
    function(err, num, raw) {
    if (err)
      res.send(err);

    res.json({ message: num + ' updated' });
  });
};


// Create endpoint /api/refuels/:refuel_id for DELETE
exports.deleteRefuel = function(req, res) {
  // Use the Refuel model to find a specific refuel and remove it
  Refuel.remove({ userId: req.user._id, _id: req.params.refuel_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Refuel removed from the system!' });
  });
};