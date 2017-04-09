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
    components: [{type: Schema.ObjectId, ref: 'Component'}],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'groups' });

groupSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('Group', groupSchema);