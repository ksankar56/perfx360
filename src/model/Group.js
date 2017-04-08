/**
 * Created by senthil on 23/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
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
    },
    component: [{type: Schema.ObjectId, ref: 'Component'}]
}, { collection: 'groups' });

module.exports = mongoose.model('Group', groupSchema);