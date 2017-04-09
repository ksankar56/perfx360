/**
 * Created by senthil on 23/03/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    },
    groups: [{type: Schema.ObjectId, ref: 'Group', unique : true}],
    components: [{type: Schema.ObjectId, ref: 'Component'}],
    createdBy: {type: Schema.ObjectId, ref: 'User'},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'projects' });

projectSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('Project', projectSchema);