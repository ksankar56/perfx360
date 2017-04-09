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
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'graph_types' });

graphTypeSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('GraphType', graphTypeSchema);