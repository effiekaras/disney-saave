// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    bio: String,
    password: String,
    avatar: String,
    lists: [String],
    following: [String],
    followers: [String],
    dateCreated: Date
});

// Export the Mongoose model
const User = mongoose.model('User', UserSchema);
module.exports = {User};
