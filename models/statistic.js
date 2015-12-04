// Load required packages
var mongoose = require('mongoose');

// Define our refuel schema
var StatisticSchema   = new mongoose.Schema({
		price_amount_average: Number,
		fuel_amount_average: Number,
		fuel_consumption_average: Number,
		cost_per_kilometer: Number,
		previous_distance_average: Number,
  		gas_price_average: Number,
});

// Export the Mongoose model
module.exports = mongoose.model('Statistic', StatisticSchema);		