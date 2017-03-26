//Require Mongoose
var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
    name: String,
    email: String
});

// Compile model from schema
var UserModel = mongoose.model('UserModel', UserModelSchema );