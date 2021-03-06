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
        type: Number,
        default: 1
    },
    status: {
        type: Boolean,
        default: true
    },
    perfLog :{
        type: Boolean,
        default: true
    },
    metricLog :{
        type: Boolean,
        default: false
    },
    networkLog :{
        type: Boolean,
        default: false
    },
    componentType: {type: Schema.ObjectId, ref: 'ComponentType'},
    group: {type: Schema.ObjectId, ref: 'Group'},
    project: {type: Schema.ObjectId, ref: 'Project'},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'components' });

compomentSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});


module.exports = mongoose.model('Component', compomentSchema);