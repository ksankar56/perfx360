/**
 * Created by senthil on 23/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var environmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    order: {
        type: Number
    },
    status: {
        type: Boolean
    }
}, { collection: 'environments' });

module.exports = mongoose.model('Environment', environmentSchema);