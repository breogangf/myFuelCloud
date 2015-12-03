// Load required packages
var mongoose = require('mongoose');

// Define our refuel schema
var RefuelSchema   = new mongoose.Schema({
		date: Number,
  		gas_price: Number,
		gas_station: String,
		price_amount: Number,
		fuel_amount: Number,
		previous_distance: Number,
		userId: String,
		vehicle: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Vehicle'
		}
});

// Export the Mongoose model
module.exports = mongoose.model('Refuel', RefuelSchema);