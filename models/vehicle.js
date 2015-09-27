// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var vehicle = new mongoose.Schema({
		brand: String,
		model: String,
		year: Number,
		created_at: Date,
		userId: String
	});

// Export the Mongoose model
module.exports = mongoose.model('Vehicle', vehicle);