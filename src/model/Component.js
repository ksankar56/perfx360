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
    componentType: {type: Schema.ObjectId, ref: 'ComponentType'},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'components' });

compomentSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});


module.exports = mongoose.model('Component', compomentSchema);