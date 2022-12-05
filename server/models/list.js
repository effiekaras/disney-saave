// Load required packages
var mongoose = require('mongoose');

// Define our task schema
var ListSchema = new mongoose.Schema({
    name: String,
    owner: String,
    items: [String],
    dateCreated: Date
});

// Export the Mongoose model
const List = mongoose.model('List', ListSchema);
module.exports = {List};