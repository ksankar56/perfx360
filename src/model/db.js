/**
 * Created by senthil on 23/03/17.
 */

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://' + global.config.mongodb.host + ":" + global.config.mongodb.port + "/" + global.config.mongodb.dbName;
//console.info("DB ", mongoDB);
mongoose.connect(mongoDB);
mongoose.set('debug', true);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));