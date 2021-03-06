/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var graphSchema = new Schema({
    graphId: {
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
    graphType: {type: Schema.ObjectId, ref: 'GraphType'},
    autoRefresh: {
        type: String
    },
    autoRefreshDefSec : {
        type: Number
    },
    zoom : {
        type: Boolean
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'graphs' });

graphSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('Graph', graphSchema);