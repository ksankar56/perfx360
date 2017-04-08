/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var graphTypeSchema = new Schema({
    typeId: {
        type: Number
    },
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
}, { collection: 'graph_types' });

module.exports = mongoose.model('GraphType', graphTypeSchema);