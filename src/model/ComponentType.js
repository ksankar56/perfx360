/**
 * Created by senthil on 23/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var compomentTypeSchema = new Schema({
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
}, { collection: 'component_types' });

module.exports = mongoose.model('ComponentType', compomentTypeSchema);