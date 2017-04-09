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
    protocol: {
        type: String
    },
    host: {
        type: String
    },
    port: {
        type: String
    },
    context: {
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
}, { collection: 'environments' });

environmentSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('Environment', environmentSchema);