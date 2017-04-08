/**
 * Created by senthil on 23/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var compomentSchema = new Schema({
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
    componentType: {type: Schema.Types.ObjectId, ref: 'ComponentType'}
}, { collection: 'components' });

module.exports = mongoose.model('Component', compomentSchema);